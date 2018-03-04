var TwitterPackage = require('twitter');

// replace the words in caps with the keys that
// we saw before on apps.twitter.com
var secret = {
  consumer_key: 'RflBBTLKrhDrvC98rFj3jIffz',
  consumer_secret: 'qKi9nWF3CNEW3PMISNE8RcDe6Nx2GwXZHJUrh2iLj1e7sGSTlO',
  access_token_key: '968672361737170947-KjR2lXgJJhtaPlOCbxJnG9qKWCfXJ63',
  access_token_secret: 'UsKCFEMn2LWFCHnZs6lQ0zpliwgtN6Nag9RigYWQur0SY'
}

var Twitter = new TwitterPackage(secret);

var query = "black panther";
Twitter.get('search/tweets', {q: query, count: 10, lang:"en"}, function(error, tweets, response) {

   var tweet_list = tweets['statuses'];

   for (var i = 0; i < tweet_list.length; i++) {
        if ('retweeted_status' in tweet_list[i]) {
            continue;
        }
        var screen_name = tweet_list[i].user.screen_name;
        var message = "@" + screen_name + " did you like black panther? #wakandaforever";
        var tweet_id = tweet_list[i].id_str

        try {
            Twitter.post('statuses/update', {"status": message, "in_reply_to_status_id":tweet_id}, function(error, tweet, response){
                 console.log("Tweet posted successfully!")
            });
        }

        catch(err) {
            console.log(err);
        }
   }
});
