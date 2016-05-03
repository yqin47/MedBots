/**
 * Created by cqiu32 on 11/4/15.
 */

function getPatientCount(){
    var $patientCount=$('#patientCount');

    $.ajax({
        type: 'GET',
        url:'http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp/base/Patient',
        dataType:'jsonp',
        success:function getPatientCount(data){
            $patientCount.append('<li>data.size</li>');

    }
    })
}