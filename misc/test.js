/* fetch promise 使用、object ver*/

const  header_text1="#プレゼントキャンペーン 応募は、@"
const header_text2=" さんをフォロー＆いいねするだけ! \n  *-*-*-*-*-*-*-*-*-*-*-* \nPresent Campaign \n*-*-*-*-*-*-*-*-*-*-*-*  *\n*\n*";
const  footer_text=" #プレゼント企画 #インスタキャンペーン #キャンペーン #プレキャン #インスタグラムキャンペーン #キャンペーン企画 #キャンペーン情報 #キャンペーン実施中 #懸賞";

window.onload=function(){
    var test=new each_data(1,'https://www.instagram.com/p/B-M0EGKgOhi/',"counter1");
    test.data_fetch('https://www.instagram.com/p/B-M0EGKgOhi/')
    .then(response =>{
	test.rewrite();
    });

    var test2=new each_data(2,'https://www.instagram.com/p/B-M0EGKgOhi/',"counter2");
    test2.data_fetch('https://www.instagram.com/p/B-M0EGKgOhi/')
    .then(response =>{
	test2.rewrite();
    })
}

function read_data(){

    fetch('https://www.instagram.com/p/B-M0EGKgOhi/')
	.then(response => response.text())
	.then(text => {
      	    // jsonだけ抜きだす                                                                                  
            json_string = text.split("window._sharedData =")[1];
            json = json_string.split("}\;\</script\>")[0] + "}";
            //jsonデータを解析                                                                                   
            adata = JSON.parse(json);
	});  

}


function  each_data (number,url,devname) {
    
	var addedhtml=" ";
	var addedurl=" "; 
	var counter=0;
	var textarea=" ";


    this.url=url;
    //表示番号
    this.number=number;
    //画像URL
    this.picturl 
    //caption
    this.caption 
    //当選人数
    this.winner = 100;
    //いいねなどの条件
    this.condition ="like & follow";
    //タイトル
    this.title = "title";
    //コメント三行分
    this.comment1 = "sample";
    this.comment2 = "sample2";
    this.commnet3 = "sample3";

    //インスタからデータをfetchしてくる 時間差に対応するよーにasyncを付けてみる
    this.data_fetch = async (url) => {
	var  json_string=" ";
	var  json=" ";
	var  adata=" ";

	await fetch(url)
            .then(response => response.text())
            .then(text => {
            // jsonだけ抜きだす
            json_string = text.split("window._sharedData =")[1];
	    json = json_string.split("}\;\</script\>")[0] + "}";
            adata = JSON.parse(json);
	    //画像URL
	    this.picturl = adata.entry_data.PostPage[0].graphql.shortcode_media.display_url;
	    //caption
	    this.caption = adata.entry_data.PostPage[0].graphql.shortcode_media.edge_media_to_caption.edges[0].node.text;;
	    //オーナーのIDを抜き出す                                                                                                         
            this.owner_id=adata.entry_data.PostPage[0].graphql.shortcode_media.owner.username;
	    });
    }
    

    //データの内容でdevの中身を書き換える関数
    this.rewrite = function(){
	    //textarea部分のHTMLを作成                                                                                                  
            textarea="<textarea cols=\"200\" rows=\"8\">"+header_text1+this.owner_id+header_text2+this.caption+footer_text+"</textarea>";
            link="<a href=\""+this.url+"\">"+this.url+"</a><br>";
            //HTML追加部分を作成                                                                                                                
 	    console.log(this.picturl);              
            addedhtml= addedhtml+"<br>"+this.number+".<br>"+"画像URL<br>"+this.picturl+"<br>"+link+"<img src="+this.picturl+" width=30% height=30% ><HR>"+textarea+"<HR><br>"; 
            //URLリスト追加部分を作成                                                                                                           
            addedurl=addedurl+counter+". "+this.url+"<br>";
            //HTML部分書き換え                                                                                                                 
            targethtml = document.getElementById(devname);
            targethtml.innerHTML = addedhtml;

    }

    //データを元にcanvasを作る関数
    this.createcanvas = function(){
	

}


}
