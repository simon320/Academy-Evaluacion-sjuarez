import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  post: any = [
    {
      id: "1",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "2",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "3",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "4",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "5",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "6",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "7",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "8",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "9",
      title: "post",
      contein: "ahjksbdbwdawd"
    },
    {
      id: "10",
      title: "post",
      contein: "ahjksbdbwdawd"
    }

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
