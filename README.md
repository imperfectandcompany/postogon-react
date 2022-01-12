# Postogon Website Integration Feature

## What technology stack is being used?
Ionic Framework frontend with ReactJS under the hood to provide access to native APIs through a runtime environment known as CapacitorJS. 

This frontend will consume the backend endpoints, which is built in php.

## What features, however sub-optimal, already exist on Postogon?
- User registration,
- User Login,
- Create a post from the frontend and store in the backend,
- View posts of the users that the logged in account are following.


## Purpose
The purpose of this project is to allow each member in the group to play a role in creating a new feature in an already existing piece of software using technologies that may or may not seem familiar with an outcome to get a better understanding of current modern web-technologies.

**Each member of the group is expected to gain exposure to the following technologies:**
- Single Page Application, using ReactJS framework
- Hybrid Application, using Ionic React (v6.0)
- Fetching JSON Object and Mutation
- Parsing responses and updating state
- User Interface and User Experience design using Figma Desktop Application
- Asynchronous http requests, using Axios HTTP Library
- Sending data, receiving data
- Understanding GET vs POST
- Familiarity with the tool Postman to mock and test endpoints
- Purpose of CORS
- Utility-first Cascading Style Sheet approach, using TailwindCSS Framework
- SQL injection security
- Creating an internal API
- Leveraging an external API that handles requests

## Description
The scope of this project is to build and implement a feature that enables a user to integrate and remove an external service provider account, such as a Spotify account, to aggregate external data. This includes allowing the user to remove integration from the account or to prevent specific data from being aggregated.

## Requirements
The Project is a business need for Postogon. To meet this business need, several requirements must be met for successful execution.

**The following requirements have been identified:**
- Fully responsive reusable component
- Screens that account for each feature
- Maintain the theme / style of the other pages in the application
- Component is abstract enough to allow for encapsulation of different service provider integrations
- Easy future adoption of the component internally through succinctly written documentation.

## Boundaries
This project includes all work associated with designing and developing the proposed feature for Postogon while maintaining its current architecture and design pattern to prevent confusion. This includes designing the UI/UX screen including different states (selected / unselected etc.), building the frontend web-component using existing technologies (TailwindCSS), documenting commits inside a Github repository, creating an endpoint that is consumed in the frontend web component to send and receive data asynchronously.

## Strategy
For the project strategy, we will leverage the team to work together in the beginning to get familiar and also comfortable with the technology with an opportunity for them to work independently when desired. Each member of the team will aid in screen design, coding work, server configuration, testing, troubleshooting, and release of the feature from a development branch to a production-ready branch. Our professor will assist us by validating conceptual and technical designs that will serve as the mockup for the project. We will have one designated technology lead and one product owner in the team to ensure the team incorporates all input from the entire group and gathered requirements.

## Deliverables
1. A tested and operational feature free of errors and meeting the specifications descriptive in the project description.
2. A tested and operational reusable component for usage of future integration for another service.
3. A complete form of documentation that provides step by step instructions on how users can access and interact with the integration feature.
4. A complete and thorough troubleshooting guide for future developers that provides corrective steps for the future developers to maintain the website internally for all anticipated problems.

## Acceptance Criteria
To ensure thorough vetting and successful completion, the Postogon Feature Project has adopted an Acceptance Criteria.

**To achieve success the following qualitative criteria must be met:**
1. Meet all deliverables within the scheduled time and scope.
2. Account for all different states and validation in the frontend.
3. Accomplish an overall web accessibility evaluation for responsiveness and mobile support.
4. Uphold a coding standard that adheres to creating a robust reusable component, making it easy to add integrations of other services. 

## Constraints
There are some considerations that must be made for constraints that are identified throughout the project lifecycle. All stakeholders in the project must be mindful of these constraints as they must be carefully thought of to prevent any adverse consequences to the project’s schedule and scope.

**The following constraints have been identified:**
1. The project must be completed by <INSERT DUE DATE HERE>.
2. Integration must be authorized by the external api provider and the authentication must be maintained within the Postogon database upon successful authorization.
3. Live (not stored) data must be aggregated and displayed from the external provider if the user is integrated.
4. Each group-member in the team needs to wear each hat to be able to effectively understand modern - web technologies.
5. Websites must conform to existing architectural design and technologies as no new libraries or packages will be adopted for usage.

## Assumptions
Assumptions introduce some level of risk to the project until they are confirmed to be true.

**During the projects development process, every effort must made to identify and mitigate any risk associated with the following assumptions:**
- The group is capable of handling all of the deliverables with the cooperation of Daiyaan and his guidance.
- The project has full support from the other members in the group and the professor authorizes us to work on this real-world project for our class project.

[postogon.com](https://postogon.com "postogon.com")
