# MedBots

## Development

#### Checkout Gitrepo Code
#### IDE Setup
- for example download - WebStorm
- use gatech student id to get free license for 2 years
#### DB Environment
- create DB / Collectons / Documents in mongolab free account
- connection string 
-- "mongodb://" + "medbots" + ":" + "mongolab12345" + "@" + "ds045464.mongolab.com" + ":" + 45464 + "/" + "medbots"

#### Running the App
- node app.js


## Using API
### Drugs data search
Note:
- Data extracted from NIH-NLM drugLabels and stored into mongolab
- https://mongolab.com/databases/medbots/collections/drugs

Query MongoDb:
- http://localhost:3000/drugs/indications/hyperhomocysteinemia
 returns drugs which are recommended for the symptom hyperhomocysteinemia
- http://localhost:3000/drugs/sideeffects/nausea
 returns drugs data which generates a side effect 'nausea' , so not recommended for someone with nausea
- http://localhost:3000/drugs/sideeffects/gas
  returns empty data

### FHIR Patient's conditions search
Note:
use any patient id from read-only FHIR server
- http://localhost:3000/fhir/conditions/patient/3

### FHIR Patient's Medication search
- http://localhost:3000/fhir/medications/patient/3
 
### ToDo
- correlate current symptoms with past conditions
- correlate recommended drugs (matching symptoms) with past medications

## User Experience

- Using a Admin Dashboard layout with Bootstrap; Homepage is index.html; Login page is not in use
- working on display some FHIR server info on dashboard(# of patients, prescriptions,encounters.........)

## Deployment to AWS
- scp -i medbots.pem MedBots-master/MedBotsApp.zip ubuntu@52.32.59.147:
- ssh -i "medbots.pem" ubuntu@52.32.59.147
- cd /home/ubuntu/MedBotsApp and replace content
- restart nodejs
nohup nodejs app.js > output.log &
