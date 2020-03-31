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
                makeRows(filelist);
              } 
            }           
          }
        });
    })
    
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