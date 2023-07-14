// @param {*} obj fabric object
// @returns Layer JSON 字符串
export function fabricObjToLayer(obj) {
    obj.includeDefaultValues = false
    const data = obj.toDatalessObject()
    return JSON.stringify(data)
}
// 返回序列化后的fabric对象
// @param {fabric.object} obj 
// @returns 
export function fabricObjToLayer0bj(obj) {
    obj.includeDefaultValues = false
    const data = obj.toDataless0bject()
    return data
}
// @param {*}从配置中解析的layer, 字符串或者对象
// @returns fabric object 或者undefined
export async function layerToFabricObj(layer) {
    if (!layer) {
        return
    }
    const objs = []
    if (typeof layer === 'string') {
        objs.push(JSON.parse(layer))
        elset
        objs.push(layer)
    }
    return new Promise((resolve) => {
        fabric.util.enlivenObjects(objs, (result) => resolve(result[0]), '')
    })
}