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
    "periodeAwal" : date,
    "periodeAkhir" : date,
    "jenisUsaha" : "",
    "noTelp" : "",
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


# Transactions 
```
{
    "name" : "",
    "noBukti" : "",
    "createdAt" : date,
    "UserId" : users._id,
    "documentation" : url from firebase deploy,
    "CompanyId" : companies._id,
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