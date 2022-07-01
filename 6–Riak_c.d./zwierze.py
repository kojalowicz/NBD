import riak

riakClient = riak.RiakClient(pb_port=8087)
bucket = riakClient.bucket('s25885')

# Add
rekord = {"Imie": "Latek", "rodzaj": "Kon", "wiek": 15, "roslinozerca": True}
key = bucket.new('rekord', data=rekord)
key.store()
print('Rekord dodany.')

# Get and Print
pobranyRekord = bucket.get('rekord')
print('Pobrany rekord: ' + str(pobranyRekord.data))

# Edit
pobranyRekord.data['roslinozerca'] = False
pobranyRekord.store()

# Get and Print
pobranyRekord2 = bucket.get('rekord')
print('Pobrany zaktualizowany rekord: ' + str(pobranyRekord2.data))

# delete
pobranyRekord2.delete()
print('Usunieto rekord.')

# Get and Print
pobranyRekord3 = bucket.get('rekord')
print('Usuniety rekord: ' + str(pobranyRekord3.data))
