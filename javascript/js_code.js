let json_url = 'https://www.reddit.com/r/javascript.json';

// call the function to get json data
// use `promise` to build the Object of DataArray once json is available
// use the DataArray obj to build the body
get_json(json_url)
    .then(function (json_data) {

        let data_ = new DataArray();
        // fill in the data
        data_.fill_data_array(json_data);

        console.log("DataArray : ", data_);

        // use this data to fill in the content
        add_to_body(data_);
    })

/**
 * get JSON from the url
 * @param {*} url : give the url where the JSON is present
 * return : JSON object/string
 */
async function get_json(url) {
    return $.getJSON(json_url);
}

/**
 * Wrapper Class
 * containing array of Data
 */
function DataArray() {
    this.data_array = new Array();

    this.fill_data_array = function (json_obj) {

        // start point to be used for getting data
        var req_data = json_obj['data']['children'];

        for (i = 0; i < req_data.length; i++) {
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
function Data(url, score, title, link_flair_text, domain, selftext, created_utc, author, author_flair_text, num_comments) {
    this.url = url;

    this.score = score;

    this.title = title;
    this.link_flair_text = link_flair_text;
    this.domain = domain;

    this.selftext = selftext;

    this.selftext = selftext;
    
    // convert to date - multiply by 1000 to convert seconds to milliseconds
    var date = new Date(created_utc * 1000);
    this.created_utc = date.toDateString();

    this.author = author;
    this.author_flair_text = author_flair_text;

    this.num_comments = num_comments;
}

function add_to_body(data_) {

    let ele;

    let outside_container = document.getElementById("custom-outside-container");
    let inner_card = document.getElementById("first-dummy-card");
    
    // Loop through each element in Array to change the value where required
    for ([index, ele] of data_.data_array.entries()) {
        // clone the first (dummy) div
        let clone = inner_card.cloneNode(true);

        // change the element value using the array
        clone.getElementsByClassName("custom-score-text")[0].innerHTML = ele.score;
        clone.getElementsByClassName("href-title")[0].innerHTML = ele.title;
        clone.getElementsByClassName("custom-domain")[0].innerHTML = ele.domain;
        clone.getElementsByClassName("custom-created-utc")[0].innerHTML = "Submitted " + ele.created_utc + 
                                                                                " days ago by";
        clone.getElementsByClassName("custom-author")[0].innerHTML = ele.author;
        clone.getElementsByClassName("custom-number-comments")[0].innerHTML = ele.num_comments + ' comments';

        // add href
        clone.getElementsByClassName("href-title")[0].href = ele.url;
        clone.getElementsByClassName("custom-number-comments")[0].href = ele.url;        

        if(ele.author_flair_text!=null)
            clone.getElementsByClassName("custom-author-flair-text")[0].innerHTML = '- ' + ele.author_flair_text;
        else
            clone.getElementsByClassName("custom-author-flair-text")[0].innerHTML = null;

        if (ele.link_flair_text !== null) {
            clone.getElementsByClassName("custom-link-flair-text")[0].innerHTML = ele.link_flair_text;
        }
        else
            clone.getElementsByClassName("custom-link-flair-text")[0].hidden = 'true';
        
        // change the id of the card depending upon the index
        clone.id = 'card-' + index;
        clone.getElementsByClassName("custom-link-flair-text")[0].innerHTML = ele.link_flair_text;
        
        //add to the list
        outside_container.appendChild(clone);
    }

    // hide the dummy card
    inner_card.hidden = true;
}