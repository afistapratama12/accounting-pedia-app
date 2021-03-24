function showTotalInventory (inventories) {
    inventories.map(inv => {
        return inv.total = inv.stock * inv.unitPrice
    })

    return inventories
}

module.exports = {
    showTotalInventory
}