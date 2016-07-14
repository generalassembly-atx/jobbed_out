require('dotenv').config();

var mongoose = require('mongoose');

mongoose.connect(process.env.JOBBED_OUT_DB);

var Job = require('./models/job');

Job.create(
  {
    title: "Full Stack Developer",
    employer: "Eureka Software Solutions, Inc.",
    hyperlink: "http://www.builtinaustin.com/job/full-stack-developer-5",
    description: "Eureka Software Solutions is seeking experienced Full Stack Developers to grow our team of technology experts.  We are looking for experienced developers who live for building scalable systems… and know how to get them online, efficiently.  You are also able to develop slick front ends and clean data models. In short, you can do it all."
  },
  {
    title: "Full Stack Developer",
    employer: "RunTitle",
    hyperlink: "http://www.builtinaustin.com/job/full-stack-developer-8",
    description: "Are you an experienced web-software dev? If you have worked on a production website with meaningful traffic and customers, are familiar with at least 3 programming languages, and are comfortable moving fast and iterating quickly then we would love to speak with you. Are you interested in helping to build a business that will change the way an entire industry operates? People often want to work on projects that they can imagine their friends and family using (we love doing that too), but we have the unique opportunity to completely dominate a market and really change a major segment of one of the largest industries in the world."
  },
  {
    title: "UI Software Engineer",
    employer: "HomeAway",
    hyperlink: "http://www.builtinaustin.com/job/ui-software-engineer",
    description: "Have you ever had the opportunity to impact the lives of millions of people in a meaningful way by helping them enjoy time away with their friends and families building memories? That is what we do here at HomeAway.com. A company within the Expedia portfolio, we are the world's leading online marketplace for the vacation rental industry with more than 1.2 million properties listed in 193 countries across our sites. We have over one billion visitors per year and serve more than one billion page views per month."
  },
  function(err, jobs) {
    console.log("Jobs created!");
    mongoose.connection.close();
  }
);
