var express = require('express');
var router = express.Router();
var util     = require("util");
var http = require("http");


searchConditions = function searchConditions(patientId, cb) {
  console.info('Searching Conditions ...')

  var http_request_info = {
    host: "polaris.i3l.gatech.edu",
    port:8080,
    path:'/gt-fhir-webapp-ro/base/Condition?patient=Patient/'+patientId+'&_format=json',
    method:'GET',
    headers: {
      'Content-Type': 'application/json+fhir;charset=UTF-8'
    }
  }

  var searchReq = http.request(http_request_info, function (condRes) {

    console.info('status', condRes.statusCode)
    console.info('headers', JSON.stringify(condRes.headers))
    condRes.setEncoding('utf8')
    condRes.on('data', function (condData) {
      console.info('GOT Chunk:\n')
      cb('CHUNK',condData);
    });
    condRes.on('end', function (condData) {
      console.info('GOT All data!')
      cb('END',condData);
    });
  });

  searchReq.on('error', function (e) {
    console.log('Errors .... ')
    console.error(e)
    cb('No Data');
  });

  searchReq.end();
  console.info('Done')
}

searchMedicationPrescriptions = function searchMedicationPrescriptions(patientId, cb) {
  console.info('Searching Prescriptions ...')

  var http_request_info = {
    host: "polaris.i3l.gatech.edu",
    port:8080,
    path:'/gt-fhir-webapp-ro/base/MedicationPrescription?patient=Patient/'+patientId+'&_format=json',
    method:'GET',
    headers: {
      'Content-Type': 'application/json+fhir;charset=UTF-8'
    }
  }

  var searchReq = http.request(http_request_info, function (medRes) {

    console.info('status', medRes.statusCode)
    console.info('headers', JSON.stringify(medRes.headers))
    medRes.setEncoding('utf8')
    medRes.on('data', function (medData) {
      console.info('GOT Chunk:\n')
      cb('CHUNK',medData);
    });
    medRes.on('end', function (medData) {
      console.info('GOT All data!')
      cb('END',medData);
    });
  });

  searchReq.on('error', function (e) {
    console.log('Errors .... ')
    console.error(e)
    cb('No Data');
  });

  searchReq.end();
  console.info('Done')
}

searchMedications = function searchMedications(medicationId, cb) {
  console.info('Searching Medications ...')

  var http_request_info = {
    host: "polaris.i3l.gatech.edu",
    port:8080,
    path:'/gt-fhir-webapp-ro/base/Medication?_id='+medicationId+'&_format=json',
    method:'GET',
    headers: {
      'Content-Type': 'application/json+fhir;charset=UTF-8'
    }
  }

  var searchReq = http.request(http_request_info, function (medRes) {

    console.info('status', medRes.statusCode)
    console.info('headers', JSON.stringify(medRes.headers))
    medRes.setEncoding('utf8')
    medRes.on('data', function (medData) {
      console.info('GOT Chunk:\n')
      cb('CHUNK',medData);
    });
    medRes.on('end', function (medData) {
      console.info('GOT All data!')
      //cb('END',medData);
    });

  });

  searchReq.on('error', function (e) {
    console.log('Errors .... ')
    console.error(e)
    cb('No Data');
  });

  searchReq.end();
  console.info('Done')
}

searchPatientByLast=function searchPatientByLast(lastName,cb){
  console.info('Searching Patients ...')

  var http_request_info = {
    host: "polaris.i3l.gatech.edu",
    port:8080,
    path:'/gt-fhir-webapp-ro/base/Patient?family='+lastName+'&_format=json',
    method:'GET',
    headers: {
      'Content-Type': 'application/json+fhir;charset=UTF-8'
    }
  }

  var searchReq = http.request(http_request_info, function (condRes) {

    console.info('status', condRes.statusCode)
    console.info('headers', JSON.stringify(condRes.headers))
    condRes.setEncoding('utf8')
    condRes.on('data', function (condData) {
      console.info('GOT Chunk:\n')
      cb('CHUNK',condData);
    });
    condRes.on('end', function (condData) {
      console.info('GOT All data!last name')
     // cb('END',condData);
    });
  });

  searchReq.on('error', function (e) {
    console.log('Errors .... ')
    console.error(e)
    cb('No Data');
  });

  searchReq.end();
  console.info('Last Name Search Done')


}





router.get('/conditions/patient/:ptid', function(req, res, next) {
  util.debug('req param  >>>>  ' + req.params.ptid)

  var finalData = {}
  var result = "";

  searchConditions(req.params.ptid, function(status,data){
    console.log('Got all patients data')
    //util.debug(" RESULT !!" + data)
    if(status == 'CHUNK') {
      result += data;
    }else if (status == 'END') {
      resultSet = JSON.parse(result);
      var count = 1;
      for(var attributename in resultSet.entry){
        var resource =  JSON.parse(JSON.stringify(resultSet.entry[attributename]))['resource'];

        var onsetDateTime = JSON.parse(JSON.stringify(resource))['onsetDateTime'];
        var notes = JSON.parse(JSON.stringify(resource))['notes'];

        var symptoms = {}
        symptoms['date']= onsetDateTime;
        symptoms['condition']=notes;
        var recordInd = 'medical_record_'+count++
        finalData[recordInd]=symptoms

        //console.log(' onsetDateTime >> '+onsetDateTime);
        //console.log(' notes >> '+notes);

      }

      res.json(finalData);
    }
  });

});

router.get('/medications/patient/:ptid', function(req, res, next) {
  util.debug('req param  >>>>  ' + req.params.ptid)

  var finalData = {}
  var result = "";
  var result2 = "";

  searchMedicationPrescriptions(req.params.ptid, function(status,data){
    console.log('Got all patients data')
    //util.debug(" RESULT !!" + data)
    if(status == 'CHUNK') {
      result += data;
    }else if (status == 'END') {
      resultSet = JSON.parse(result);
      var count = 1;
      for(var attributename in resultSet.entry){
        var resource =  JSON.parse(JSON.stringify(resultSet.entry[attributename]))['resource'];

        var dateWritten = JSON.parse(JSON.stringify(resource))['dateWritten'];
        var medication = JSON.parse(JSON.stringify(resource))['medication'];
        var medId = JSON.parse(JSON.stringify(medication))['reference'];
        var medName = "";

        
        searchMedications(medId, function(status2,data2) {
          
         if(status2 == 'CHUNK') {
          var resultset = JSON.parse(data2);
          medName = resultset.entry[0].resource.name;
          console.log(resultset.entry[0].resource.name);

         } else if (status2 == 'END') {

         }


        });
        

        var prescriptions = {}
        prescriptions['datePrescribed']= dateWritten;
        prescriptions['medication']=medId;
        prescriptions['medicationName']=medName;
        var recordInd = 'prescription_record_'+count++
        finalData[recordInd]=prescriptions

        //console.log(' onsetDateTime >> '+onsetDateTime);
        //console.log(' notes >> '+notes);

      }

      res.json(finalData);
    }
  });

});


router.get('patient/:family', function(req, res, next) {
  util.debug('req param  >>>>  ' + req.params.familyName)

  var finalData = {}
  var result = "";

  searchPatientByLast(req.params.family, function(status,data){
    console.log('Got all patients data via last name')
    //util.debug(" RESULT !!" + data)
    if(status == 'CHUNK') {
      result += data;
    }else if (status == 'END') {
      resultSet = JSON.parse(result);
      var count = 1;
      for(var attributename in resultSet.entry){
        var resource =  JSON.parse(JSON.stringify(resultSet.entry[attributename]))['resource'];

        var family = JSON.parse(JSON.stringify(resource))['family'];
        var given = JSON.parse(JSON.stringify(resource))['given'];
        var gender = JSON.parse(JSON.stringify(resource))['gender'];
        var birthDate = JSON.parse(JSON.stringify(resource))['birthDate'];




        var info = {}
        info['family']= family;
        info['given']=given;
        info['gender']= gender;
        info['birthDate']=Birthdate;

        var recordInd = 'patient_record_'+count++
        finalData[recordInd]=info

        //console.log(' onsetDateTime >> '+onsetDateTime);
        //console.log(' notes >> '+notes);

      }

      res.json(finalData);
    }
  });

});


module.exports = router;
