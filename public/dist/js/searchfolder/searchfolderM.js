<script>
$(function(){
    $('.btn-submit').click(function(){
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
  var tbody = $('#table-search tbody');
  $.each(filelist,function(k, v){
    console.log(">>> "+v);
  })
}
</script>