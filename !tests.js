const testObject = [
    {
        id: '3',
        cat_name: 'fruit',
        product_name: 'somename',
    },
    {
        id: '5',
        cat_name: 'vegs',
        product_name: 'dsds',
    },
    {
        id: '7',
        cat_name: 'fruit',
        product_name: 'somfsdfsdename',
    },
    {
        id: '9',
        cat_name: 'fruit',
        product_name: 'somesdfsssdname',
    }
]

const cats = [...new Set(testObject.map(item => (item.cat_name)))]

const cats1 = testObject.map(item => item.cat_name).filter((v, i, a) => a.indexOf(v) === i)

console.log(cats1)
