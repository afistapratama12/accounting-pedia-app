# microservice
- data sciente analisis financial
- micro feature
- out of product accounting


# User 
```
{
    "firstName" : "",
    "lastName" : "",
    "username" : "",
    "email" : "",
    "password" : "",
    "numberHPUser" : 0,
    "address" : ""
}
```

# Company 
```
{
    "name" : "",
    "address" : "",
    fax : req.body.fax,
    npwp : req.body.npwp,
    website : req.body.website,
    email : req.body.email,
    "periodeAwal" : date,
    "periodeAkhir" : date,
    "jenisUsaha" : "",
    "noTelp" : "",
    "checkFillSaldoAwal" : true / false,
    "checkFillContact" : true/ false,
    "checkFillFixedAsset" : true/ false,
    "UserId" : users._id
}
```

# Akuns 
```
{
    "AccNumber" : "",
    "AccName" : "",
    "Head" : "",
    "Category" : "",
    "subCategory" : "",
    "saldo" : 0,
    "debet" : 0,
    "kredit" : 0,
    "position" : "",
    "UserId" : users._id,
    "CompanyId" : companies._id
}
```

# Contact 
```
{
    "name" : "",
    "code" : "",
    "email" : "",
    "numberHandphone" : 0,
    "type" : karyawan, supplier, customer, other
    "createdAt" : date,
    "saldo" : 0,
    "debet" : 0,
    "kredit" : 0,
    "UserId" : users._id,
    "CompanyId" : companies._id,
    "AkunId" : akuns._id,
    "mutations" : [{
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }, {
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }]
}
```


# Fixed Asset
```
{
    "name" : "",
    "noBukti" : "",
    "code" : ""
    documentation
    category
    buyDate
    umurEkonomis
    nilaiResidu
    totalCost
    methodDepreciation
    "UserId" : users._id,
    "CompanyId" : companies._id,
    "AkunId"
    "mutations" : [{
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }, {
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }]
}
```


# Inventories 
```
{
    "name" : "",
    code
    "noBukti" : "",
    stock
    unitPrice
    category
    "UserId" : users._id,
    "CompanyId" : companies._id,
    "AkunId"
    "mutations" : [{
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }, {
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }]
}
```



# Transactions 
```
{
    "name" : "",
    "noBukti" : "",
    "createdAt" : date,
    "documentation" : url from firebase deploy,
    "UserId" : users._id, // wajib
    "CompanyId" : companies._id, // wajib
    "ContactId": contacts._id // transaction if payable
    "FIxedAssetId" : fixed-assets._id
    "InventoryId" : inventories._id
    "mutations" : [{
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }, {
        "debet" : 0,
        "kredit" : 0,
        "AkunId" : akuns._id
    }]
}
```




**harus pake akun id jangan pake no akun karena nanti terduplikat jika user buat company banyak**

otomatis create akun, jika buat company
otomatis delete akun, dan delete transaction jika delete company

untuk free
**Maksimum 3 company per user**
**Maksimum 1000 transaction per year**