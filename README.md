# Project 4: MERN Full Stack Web Application

## Background and Context

Developed based on a connection's personal annecdote of having difficulty reporting and tracking sales figures of their employees. Currently, the user relies heavily of third party messaging applications (e.g. WhatsApp) for employees to post any sales transaction that may have happened over the course of the day. The biggest pain points of the user are as follows:

- High degree of typos and mistakes
- Inability to track employeee's performance vis a vis their targets in a singular app
- Viewing of team level metrics require manual data manipulation on excel which can be extremely time consuming
- Reporting of sales figures are in a group based chat which reduces employee privacy

## Designing the App

### User Stories

User Stories

- AAU, I should be able to sign in and out of the application
- AAU I want my username to be unique to me
- AAU I expect to know what role I am assigned to when I log in (supervisor, individual contributor)
- AAU I want to be able to change my password
- AAU I want to be able to navigate easily through the application with the help of navigation bars

As a supervisor (AAS):

- AAS I want to be able to see an individual employee's sales data
- AAS I want to be able to my whole team's sales data
- AAS I want to be able to be able to assign/reassign employees to me so that I am able to see their sales data

As an IC (AAI):

- AAI I want to be able to see my own sales data
- AAI I want to be able to input sales data via a form
- AAI I want to be able to edit any previously input sales data
- AAI I want to be able to delete any sales data that may have been free-looked

### Screengrabs of game

1. Sign In Page
   [Sign In page](README_images/signin_page.png)

## Technologies Used

- MongoDB
- ExpressJS
- React
- Typescript

## Libraries Used

- shadcn (with Tailwind CSS)
- Zod
- React Bits
- Jotai

## Planned future stretchgoals

- Additional graphical charts for better analysis
- Comment boxes
- Notification bar (for Supervisor to know if any new transactions were made by team)
