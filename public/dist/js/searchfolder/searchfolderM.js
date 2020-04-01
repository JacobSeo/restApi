<script>
$(function(){
    $('.btn-submit').click(function(){
        let tbody = $('#table-search tbody');
        if($('#path').val() == ""){
            return
        }
        $.ajax({
          url: "/searchfolder",
          type: "post",
          data : {data :$('#path').val()},
          dataType: "json",
          success:function(data){
            //console.log(data);
            var filelist = data['data'];
            console.log("filelist " + filelist);
            var msg = data['msg'];
            if(msg == "file"){
              alert('파일입니다.');
            }else{
              if(filelist != "" || filelist != Null){
                $('#table-search tbody').empty();
                makeRows(filelist);
              } 
            }           
          }
        });
    })

    $("#my_file_input").on("change", function(e){	
      var files = e.target.files; //input file 객체를 가져온다.
      var i,f;
      for (i = 0; i != files.length; ++i) {
          f = files[i];
          var reader = new FileReader(); //FileReader를 생성한다.                   
          //성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
          var json = "";
          reader.onload = function(e) {               
            var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.
 
            //바이너리 형태로 엑셀파일을 읽는다.
            var workbook = XLSX.read(data, {type: 'binary'});
            
            //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
            workbook.SheetNames.forEach(function(item, index, array) {
                EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
                json += JSON.stringify(EXCEL_JSON)+"<br>";                
            });//end. forEach
            console.log(json);
            $('#json-list').append(json);
            
          }; //end onload
          //파일객체를 읽는다. 완료되면 원시 이진 데이터가 문자열로 포함됨.
          reader.readAsBinaryString(f);         
      }//end. for    
    });
    
});

function makeRows(filelist){
  let tbody = $('#table-search tbody');
  let htmlStr ="";
  $.each(filelist,function(k, v){
    htmlStr += "<tr>";
		htmlStr += "<td>"+v+"</td>";
		htmlStr += "</tr>";
  });
  tbody.append(htmlStr);
}
</script>