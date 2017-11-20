let json_url = 'https://www.reddit.com/r/javascript.json';

// call the function to get json data
// use `promise` to build the Object of DataArray once json is available
get_json(json_url)
.then(function(json_data){

    let data_array = new DataArray();
    // fill in the data
    data_array.fill_data_array(json_data);

    console.log("DataArray : ", data_array );
})

/**
 * get JSON from the url
 * @param {*} url : give the url where the JSON is present
 * return : JSON object/string
 */
async function get_json(url){
    return $.getJSON(json_url);
}

/**
 * Wrapper Class
 * containing array of Data
 */
function DataArray(){
    this.data_array = new Array();

    this.fill_data_array = function(json_obj){

        // start point to be used for getting data
        var req_data = json_obj['data']['children'];

        for(i=0; i<req_data.length; i++){
            var url = req_data[i]['data']['url'];
            
            var score = req_data[i]['data']['score'];
            var title = req_data[i]['data']['title'];
            var link_flair_text = req_data[i]['data']['link_flair_text'];
            var domain = req_data[i]['data']['domain'];
            
            var selftext = req_data[i]['data']['selftext'];
            var created_utc = req_data[i]['data']['created_utc'];
            var author = req_data[i]['data']['author'];
            var author_flair_text = req_data[i]['data']['author_flair_text'];
            
            var num_comments = req_data[i]['data']['num_comments'];

            //Add to the Array
            this.data_array.push(new Data(url, score, title, link_flair_text, domain, 
                selftext, created_utc, author, author_flair_text, num_comments))
        }
    }
}

/**
 * Class
 * provide the single entity structure
 * @param {*} url 
 * @param {*} score 
 * @param {*} title 
 * @param {*} link_flair_text 
 * @param {*} domain 
 * @param {*} selftext 
 * @param {*} created_utc 
 * @param {*} author 
 * @param {*} author_flair_text 
 * @param {*} num_comments 
 */
function Data(url, score, title, link_flair_text, domain, selftext, created_utc, author, author_flair_text, num_comments){
    this.url = url;
    
    this.score = score;
    this.title = title;
    this.link_flair_text = link_flair_text;
    this.domain = domain;
    
    this.selftext = selftext;
    this.created_utc = created_utc;
    this.author = author;
    this.author_flair_text = author_flair_text;
    
    this.num_comments = num_comments;
}



