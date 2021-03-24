function allTransactionAkun(akunName, transaction) {
    let trans = []

    for(let i = 0 ; i < transaction.length ; i++) {
        for(let j = 0 ; j < transaction[i].mutations.length ; j++) {
            if(transaction[i].mutations[j].AkunId == akunName._id) {
                trans.push({
                    TransactionId : transaction[i]._id,
                    name :  transaction[i].name,
                    noBukti : transaction[i].noBukti,
                    date : transaction[i].createdAt,
                    debet : transaction[i].mutations[j].debet,
                    kredit : transaction[i].mutations[j].kredit
                })
            }
        }
    }

    if(akunName.position == "D") {
        akunName.saldo += akunName.debet
    } else {
        akunName.saldo += akunName.kredit
    }

    for(let k = 0 ; k < trans.length; k++) {
        if(akunName.position == "D") {
            akunName.saldo += trans[k].debet
            akunName.saldo -= trans[k].kredit
        } else {
            akunName.saldo -= trans[k].debet
            akunName.saldo += trans[k].kredit
        }
    }

    if(!akunName["transactions"]) {
        akunName["transactions"] = trans
    }

    return akunName
}


function showAllAkunWithTransaction(allAkun, transaction) {
    allAkun.map(akunName => {

        return allTransactionAkun(akunName, transaction)
    })

    return allAkun
}

module.exports = {
    allTransactionAkun,
    showAllAkunWithTransaction
}

