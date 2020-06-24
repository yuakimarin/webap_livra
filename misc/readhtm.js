
window.onload = function() {
await fetch("https://qiita.com/api/v2/items");

let reader = new FileReader();

    //対象URL
url="https://www.instagram.com/p/B-M0EGKgOhi/";
url="http://livra.test/get_ifpict_url.html";

    fetch(url).then(function(response) {
	console.dir(response);
	return response.Text;
    }).then(function(tex) {
//	  console.log(typeof(tex));
          var json_string = tex.split("window._sharedData =")[1];      
    });

}
