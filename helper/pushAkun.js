const fs = require("fs")

function pushAccount(userId, companyId) {
    let accountList = JSON.parse(fs.readFileSync('./seeding/listAccount.json', {encoding : "utf-8"}))

    accountList.forEach(account => {
        account["UserId"] = userId
        account["CompanyId"] = companyId
    });

    return accountList 
}

// console.log(pushAccount("12123123", "121312312"))


module.exports = {
    pushAccount
}