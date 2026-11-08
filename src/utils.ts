/**
 * Deep copy function for TypeScript.
 * @param T Generic type of target/copied value.
 * @param target Target value to be copied.
 * @see Source project, ts-deeply https://github.com/ykdr2017/ts-deepcopy
 * @see Code pen https://codepen.io/erikvullings/pen/ejyBYg
 */
 export function deepCopy<T>(target: T): T {
    if (target === null) {
        return target
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any
    }
    // First part is for array and second part is for Realm.Collection
    // if (target instanceof Array || typeof (target as any).type === 'string') {
    if (typeof target === 'object') {
        if (typeof (target as { [key: string]: any })[(Symbol as any).iterator] === 'function') {
            const cp = [] as any[]
            if ((target as any as any[]).length > 0) {
                for (const arrayMember of target as any as any[]) {
                    cp.push(deepCopy(arrayMember))
                }
            }
            return cp as any as T
        } else {
            const targetKeys = Object.keys(target)
            const cp = {} as { [key: string]: any };
            if (targetKeys.length > 0) {
                for (const key of targetKeys) {
                    cp[key] = deepCopy((target as { [key: string]: any })[key])
                }
            }
            return cp as T
        }
    }
    // Means that object is atomic
    return target
}

export function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }

export function downloadTextFile(text, name) {
    const a = document.createElement('a');
    const type = name.split(".").pop();
    a.href = URL.createObjectURL( new Blob([text], { type:`text/${type === "txt" ? "plain" : type}` }) );
    a.download = name;
    a.click();
    a.remove();
}

export function isEqual(a: unknown, b: unknown) {
    return JSON.stringify(a) === JSON.stringify(b);
}

/**
 * Three-way merge that updates a widget's model with new state from the store without losing the
 * user's unsaved edits. `base` is the state the local edits were made against: values that differ
 * between `local` and `base` are kept, everything else is taken from `remote`. Objects and list items
 * are updated in place, so UI bindings and open dialogs keep pointing at the same objects. `remote`
 * must be a private copy, since parts of it are adopted into the result.
 */
export function mergeChanges<T>(base: T, local: T, remote: T): T {
    if (isEqual(local, remote) || isEqual(remote, base)) return local;

    if (isPlainObject(local) && isPlainObject(remote)) {
        const localObject = local as Record<string, unknown>;
        const remoteObject = remote as Record<string, unknown>;
        const baseObject = (isPlainObject(base) ? base : {}) as Record<string, unknown>;
        for (const key of Object.keys(remoteObject)) {
            localObject[key] = mergeChanges(baseObject[key], localObject[key], remoteObject[key]);
        }
        for (const key of Object.keys(localObject)) {
            if (!(key in remoteObject) && isEqual(localObject[key], baseObject[key])) {
                delete localObject[key];
            }
        }
        return local;
    }

    if (Array.isArray(local) && Array.isArray(remote)) {
        return mergeArrays(Array.isArray(base) ? base : [], local, remote) as unknown as T;
    }

    return isEqual(local, base) ? remote : local;
}

function mergeArrays(base: unknown[], local: unknown[], remote: unknown[]) {
    // Usually the store has only changed values in the items, or added or removed items at the end
    // (e.g. a spell learned from the wishlist, or seasons added when the year changes)
    const common = Math.min(base.length, remote.length);
    let sameItemsInOrder = local.length === base.length;
    for (let i = 0; i < common && sameItemsInOrder; i++) {
        sameItemsInOrder = isSameItem(base, i, remote);
    }
    if (sameItemsInOrder) {
        for (let i = 0; i < common; i++) {
            local[i] = mergeChanges(base[i], local[i], remote[i]);
        }
        local.splice(remote.length);
        local.push(...remote.slice(local.length));
        return local;
    }

    // The store reordered the items (e.g. by sorting after a save). Without local edits we can reuse
    // the local objects for the items it still has, so references to them stay valid.
    if (isEqual(local, base)) {
        const localByKey = itemsByUniqueKey(local);
        const remoteByKey = itemsByUniqueKey(remote);
        return remote.map(remoteItem => {
            const key = keyOf(remoteItem);
            const localItem = remoteByKey.has(key) ? localByKey.get(key) : undefined;
            return localItem === undefined ? remoteItem : mergeChanges(deepCopy(localItem), localItem, remoteItem);
        });
    }

    // Both the user and the store changed which items the list holds. The store's version wins, so its
    // data is never lost, at the cost of the user's unsaved edits to this list.
    return remote;
}

function isPlainObject(value: unknown) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}

// What identifies a list item, if anything. Items without a key (or with an empty name) are identified by position.
function keyOf(item: unknown) {
    const { name, year, season } = (isPlainObject(item) ? item : {}) as { name?: unknown, year?: unknown, season?: unknown };
    if (typeof name === 'string') return name;
    if (year !== undefined && season !== undefined) return `${year} ${season}`;
    return undefined;
}

function itemsByUniqueKey(items: unknown[]) {
    const counts = new Map<string, number>();
    items.forEach(item => {
        const key = keyOf(item);
        if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
    });
    const byKey = new Map<string, unknown>();
    items.forEach(item => {
        const key = keyOf(item);
        if (key && counts.get(key) === 1) byKey.set(key, item);
    });
    return byKey;
}

// Whether remote[i] is the same item as base[i]
function isSameItem(base: unknown[], i: number, remote: unknown[]) {
    const key = keyOf(base[i]);
    if (key !== keyOf(remote[i])) return false;
    if (!key) return true;

    // Items sharing a name may have swapped places, so the base item must be closer to remote[i] than to
    // any other look-alike. A tie is only accepted when the tied items are identical, so swapping them is harmless.
    const lookAlikes = remote.filter((item, j) => j !== i && keyOf(item) === key);
    const distance = countDifferences(base[i], remote[i]);
    return lookAlikes.every(item => {
        const otherDistance = countDifferences(base[i], item);
        return otherDistance > distance || (otherDistance === distance && isEqual(item, remote[i]));
    });
}

function countDifferences(a: unknown, b: unknown) {
    if (!isPlainObject(a) || !isPlainObject(b)) return isEqual(a, b) ? 0 : 1;
    const aObject = a as Record<string, unknown>;
    const bObject = b as Record<string, unknown>;
    const keys = new Set([...Object.keys(aObject), ...Object.keys(bObject)]);
    return [...keys].filter(key => !isEqual(aObject[key], bObject[key])).length;
}
