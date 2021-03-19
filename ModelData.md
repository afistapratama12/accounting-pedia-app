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
    "createdAt" : date,
    "updatedAt : date,
    "debet" : 0,
    "kredit" : 0,
    "transactionDocument" : "link", // dari firebase deploy
    "UserId" : users._id,
    "CompanyId" : companies._id,
    "AkunId" : akuns._id, 
}
```
**harus pake akun id jangan pake no akun karena nanti terduplikat jika user buat company banyak**