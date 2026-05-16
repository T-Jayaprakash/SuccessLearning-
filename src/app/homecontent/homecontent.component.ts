import { Component } from '@angular/core';

@Component({
  selector: 'app-homecontent',
  templateUrl: './homecontent.component.html',
  styleUrls: ['./homecontent.component.css']
})
export class HomecontentComponent {

  title: string = 'Why success learning?';
  sig: string = 'Score Improvement Guarantee';
  sigPara: string = 'We will guarantee that you will get a higher test score upto 250 points';

  qcd: string = 'Quality content delivery';
  qcdPara: string = 'Our content pedagogy for classroom and online is designed to maximize your results';
  
  ei: string = 'Expert Instructors';
  eiPara: string = 'Our Advisers & Master Trainers are the secret behind our students top admit and high score';
  
  cet: string = 'Cutting - Edge Technology';
  cetPara: string = 'We have the most efficient tools for you to focus and utilize the time effeciently for preparation';
  
  idr: string = 'Instant Doubt Resolution';
  idrPara: string = 'Save Time by getting answers to all your doubts instantly. Our best teacher will help you with all your subject related questions';
  idrList : any = [{id:"1", name:"Ask Doubt", image:"../../assets/images/msg-icon.jpg"}, {id:"2", name:"Get Instant Answers", image:"../../assets/images/idea-icon.jpg"}, {id:"3", name:"Best Teacher to Assist You", image:"../../assets/images/person-icon.jpg"}];
  
  pt: string = 'Practice Test';
  ptPara1:string = 'Improve your standard with practice test & Mock Exam for all Gate, GRE, ILETS, NEET, TOFEL & SAT Courses. Get immediate Result and solution to practice test questions';
  ptList = [] = [{id:1, name:" Analytical writing", image:"../../assets/images/flag.jpg"}, {id:2, name:"Verbal", image:"../../assets/images/flag.jpg"}, {id:3, name:"Quantitive", image:"../../assets/images/flag.jpg"}, {id:4, name:"Mock Interview", image:"../../assets/images/flag.jpg"},];
  
  review: string = 'What our students & parents say';
  
  reviewHead1: string = 'Rithika';
  reviewSubHead1: string = 'Student';
  reviewMsg1: string = 'Overall, I feel much more confident expressing myself in English now. I highly recommend this spoken English class to anyone looking to enhance their communication skills in a supportive and dynamic environment.';
  
  reviewHead2: string = 'Logesh';
  reviewSubHead2: string = 'Student';
  reviewMsg2: string = 'Taking the spoken English class was a game-changer for me. The class was well-organized, and the instructor created a comfortable and inclusive learning environment.';
  // The class was well-organized, and the instructor created a comfortable and inclusive learning environment. The curriculum focused on daily conversational English, which made it incredibly practical for real-life situations.
}
