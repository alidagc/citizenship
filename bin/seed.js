const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

// We have to connect the DB again here because seed.js is SEPARATE from app.js

const Question = require('../models/question-model.js');
// ^^ connecting the Product schema to the actual creation of objects
const allTheQuestions = [
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is the supreme law of the land?",
    answers: ["the Constitution"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What does the Constitution do?",
    answers: ["sets up the government", "defines the government", "protects basic rights of Americans"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: " The idea of self-government is in the first three words of the Constitution. What are these words?",
    answers: ["We the People"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is an amendment?",
    answers: ["a change (to the Constitution)", "an addition (to the Constitution)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What do we call the first ten amendments to the Constitution?",
    answers: ["the Bill of Rights"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is one right or freedom from the First Amendment?",
    answers: ["speech", "religion", "assembly", "press", "petition the government"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "How many amendments does the Constitution have?",
    answers: ["twenty-seven (27)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What did the Declaration of Independence do?",
    answers: ["announced our independence (from Great Britain)", "declared our independence (from Great Britain)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What are two rights in the Declaration of Independence?",
    answers: ["life" , "liberty", "pursuit of happiness"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is freedom of religion?",
    answers: ["You can practice any religion, or not practice a religion."],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is the economic system in the United States?",
    answers: ["capitalist or market economy"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Principles of American Democracy",
    question: "What is the “rule of law”?",
    answers: ["Everyone must follow the law", "Leaders must obey the law", "Government must obey the law", "No one is above the law"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Name one branch or part of the government.",
    answers: ["Congress", "Legislative", "President", "Executive", "The Courts", "Judicial"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What stops one branch of government from becoming too powerful?",
    answers: ["checks and balances", "separation of powers"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who is in charge of the executive branch?",
    answers: ["the President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who makes federal laws?",
    answers: ["Congress", "Senate and House (of Representatives)", "(U.S. or national) legislature"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What are the two parts of the U.S. Congress?",
    answers: ["the Senate and House (of Representatives)"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "How many U.S. Senators are there?",
    answers: ["one hundred (100)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "We elect a U.S. Senator for how many years?",
    answers: ["six (6)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who is one of your state’s U.S. Senators now?",
    answers: ["Marco Rubio","Bill Nelson"],
    specialQuestion: true,
    stateDependent: true,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "The House of Representatives has how many voting members?",
    answers: ["four hundred thirty-five (435)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "We elect a U.S. Representative for how many years?",
    answers: ["two (2)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Name your U.S. Representative.",
    answers: ["Thomas Rooney"],
    specialQuestion: false,
    stateDependent: true,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who does a U.S. Senator represent?",
    answers: ["all people of the state"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Why do some states have more Representatives than other states?",
    answers: ["(because of) the state’s population", "(because) they have more people", "(because) some states have more people"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "We elect a President for how many years?",
    answers: ["four (4)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "In what month do we vote for President?",
    answers: ["November"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the name of the President of the United States now?",
    answers: ["Donald J. Trump"],
    specialQuestion: false,
    stateDependent: true,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the name of the Vice President of the United States now?",
    answers: ["Michael R. Pence", "Mike Pence", "Pence"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "If the President can no longer serve, who becomes President?",
    answers: [" the Vice President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "If both the President and the Vice President can no longer serve, who becomes President?",
    answers: ["the Speaker of the House"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who is the Commander in Chief of the military?",
    answers: ["the President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who signs bills to become laws?",
    answers: ["the President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who vetoes bills?",
    answers: ["the President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What does the President’s Cabinet do?",
    answers: ["advises the President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What are two Cabinet-level positions?",
    answers: ["Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense",
    "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services",
    "Secretary of Homeland Security", "Secretary of Housing and Urban Development",
    "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation",
    "Secretary of the Treasury", "Secretary of Veterans Affairs", "Attorney General", "Vice President"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What does the judicial branch do?",
    answers: ["reviews laws", "explains laws", "resolves disputes (disagreements)", "decides if a law goes against the Constitution"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the highest court in the United States?",
    answers: ["the Supreme Court"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "How many justices are on the Supreme Court?",
    answers: ["nine (9)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who is the Chief Justice of the United States now?",
    answers: ["John Roberts (John G. Roberts, Jr.)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    answers: [" to print money", "to declare war", "to create an army", "to make treaties"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Under our Constitution, some powers belong to the states. What is one power of the states? ",
    answers: ["provide schooling and education", "provide protection (police)",
    "provide safety (fire departments)","give a driver’s license", "approve zoning and land use"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "Who is the Governor of your state now?",
    answers: ["Rick Scott"],
    specialQuestion: false,
    stateDependent: true,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the capital of your state?",
    answers: [],
    specialQuestion: true,
    stateDependent: true,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What are the two major political parties in the United States?",
    answers: ["Democratic and Republican"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the political party of the President now?",
    answers: ["Republican (Party)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "System of Government",
    question: "What is the name of the Speaker of the House of Representatives now?",
    answers: ["Paul D. Ryan", "(Paul) Ryan"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: true
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "There are four amendments to the Constitution about who can vote. Describe one of them",
    answers: ["Citizens eighteen (18) and older (can vote).", "You don’t have to pay (a poll tax) to vote.",
    "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race (can vote)."],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "What is one responsibility that is only for United States citizens?",
    answers: ["serve on a jury", "vote in a federal election"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "Name one right only for United States citizens.",
    answers: ["vote in a federal election", "run for federal office"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "What are two rights of everyone living in the United States?",
    answers: ["freedom of expression", "freedom of speech", "freedom of assembly",
    "freedom to petition the government", "freedom of religion", "the right to bear arms"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answers: [" the United States", "the flag"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "What is one promise you make when you become a United States citizen?",
    answers: [" give up loyalty to other countries", "defend the Constitution and laws of the United States",
    "obey the laws of the United States", "serve in the U.S. military (if needed)",
    "serve (do important work for) the nation (if needed)", "be loyal to the United States"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "How old do citizens have to be to vote for President?",
    answers: ["eighteen (18) and older"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "What are two ways that Americans can participate in their democracy?",
    answers: ["vote" ,"join a political party", "help with a campaign",
    "join a civic group", "join a community group", "give an elected official your opinion on an issue",
    "call Senators and Representatives" ,"publicly support or oppose an issue or policy" ,
    "run for office", "write to a newspaper"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "When is the last day you can send in federal income tax forms?",
    answers: ["April 15"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American Government",
    subcategory: "Rights and Responsibilitiest",
    question: "When must all men register for the Selective Service?",
    answers: ["at age eighteen (18)", "between eighteen (18) and twenty-six (26)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "What is one reason colonists came to America?",
    answers: ["freedom", "political liberty", "religious freedom",
    "economic opportunity", "practice their religion", "escape persecution"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "Who lived in America before the Europeans arrived?",
    answers: ["American Indians", "Native Americans"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "What group of people was taken to America and sold as slaves?",
    answers: ["Africans", "people from Africa"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "Why did the colonists fight the British?",
    answers: ["because of high taxes (taxation without representation)",
    "because the British army stayed in their houses (boarding, quartering)",
    "because they didn’t have self-government"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "Who wrote the Declaration of Independence?",
    answers: ["(Thomas) Jefferson"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "When was the Declaration of Independence adopted?",
    answers: ["July 4, 1776"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "There were 13 original states. Name three.",
    answers: ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut",
    "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia",
    "North Carolina", "South Carolina", "Georgia"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "What happened at the Constitutional Convention?",
    answers: ["The Constitution was written.", "The Founding Fathers wrote the Constitution."],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "When was the Constitution written?",
    answers: ["1787"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    answers: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "What is one thing Benjamin Franklin is famous for?",
    answers: ["U.S. diplomat", "oldest member of the Constitutional Convention",
    "first Postmaster General of the United States", "writer of “Poor Richard’s Almanac", "started the first free libraries"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "Who is the “Father of Our Country”?",
    answers: ["(George) Washington"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Colonial Period and Independence",
    question: "Who was the first President?",
    answers: ["(George) Washington"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "What territory did the United States buy from France in 1803?",
    answers: ["the Louisiana Territory", "Louisiana"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "Name one war fought by the United States in the 1800s.",
    answers: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "Name the U.S. war between the North and the South.",
    answers: ["the Civil War", "the War between the States"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "Name one problem that led to the Civil War.",
    answers: ["slavery" , "economic reasons", "states’ rights"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "What was one important thing that Abraham Lincoln did?",
    answers: ["freed the slaves (Emancipation Proclamation)", "saved (or preserved) the Union",
    "led the United States during the Civil War"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "What did the Emancipation Proclamation do?",
    answers: ["freed the slaves", "freed slaves in the Confederacy",
    "freed slaves in the Confederate states", "freed slaves in most Southern states"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "1800s",
    question: "What did Susan B. Anthony do?",
    answers: ["fought for women’s rights", "fought for civil rights"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Name one war fought by the United States in the 1900s",
    answers: ["World War I", "World War II", "Korean War", "Vietnam War", "(Persian) Gulf War"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Who was President during World War I?",
    answers: ["(Woodrow) Wilson"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Who was President during the Great Depression and World War II?",
    answers: ["(Franklin) Roosevelt"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Who did the United States fight in World War II?",
    answers: ["Japan, Germany, and Italy"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Before he was President, Eisenhower was a general. What war was he in?",
    answers: ["World War II"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "During the Cold War, what was the main concern of the United States?",
    answers: ["Communism"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "What movement tried to end racial discrimination?",
    answers: ["civil rights (movement)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "What did Martin Luther King, Jr. do?",
    answers: ["fought for civil rights", "worked for equality for all Americans"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "What major event happened on September 11, 2001, in the United States?",
    answers: ["Terrorists attacked the United States."],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "American History",
    subcategory: "Recent American History and Other Important Historical Information",
    question: "Name one American Indian tribe in the United States.",
    answers: ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo",
    "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak",
    "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inuit"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "Name one of the two longest rivers in the United States.",
    answers: ["Missouri (River)", "Mississippi (River)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "What ocean is on the West Coast of the United States?",
    answers: ["Pacific (Ocean)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "What ocean is on the East Coast of the United States?",
    answers: ["Atlantic (Ocean)"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "Name one U.S. territory",
    answers: ["Puerto Rico", "U.S. Virgin Islands", "American Samoa",
    "Northern Mariana Islands", "Guam"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "Name one state that borders Canada.",
    answers: ["Maine", "New Hampshire", "Vermont", "New York", "Pennsylvania",
    "Ohio", "Michigan", "Minnesota", "North Dakota", "Montana", "Idaho", "Washington", "Alaska"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "Name one state that borders Mexico.",
    answers: ["California", "Arizona", "New Mexico", "Texas"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "What is the capital of the United States?",
    answers: ["Washington, D.C."],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Geography",
    question: "Where is the Statue of Liberty?",
    answers: ["New York (Harbor)", "Liberty Island"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Symbols",
    question: "Why does the flag have 13 stripes?",
    answers: ["because there were 13 original colonies", "because the stripes represent the original colonies"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Symbols",
    question: "Why does the flag have 50 stars?",
    answers: ["because there is one star for each state", "because each star represents a state", "because there are 50 states"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Symbols",
    question: "What is the name of the national anthem?",
    answers: ["The Star-Spangled Banner"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Holidays",
    question: "When do we celebrate Independence Day?",
    answers: ["July 4"],
    specialQuestion: true,
    stateDependent: false,
    timeSensitive: false
  },
  {
    category: "Integrated Civics",
    subcategory: "Holidays",
    question: "Name two national U.S. holidays.",
    answers: ["New Year’s Day", "Martin Luther King, Jr. Day", "Presidents’ Day",
    "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"],
    specialQuestion: false,
    stateDependent: false,
    timeSensitive: false
  },

];

Question.create(
  allTheQuestions,             // 1st argument -> array of all questions in database
  (err, questionsArray) => {   // 2nd argument -> callback
    if (err){
      console.log("Oh no! Database error.");
      return;
    }
    questionsArray.forEach((oneQuestion) => {
      console.log("New question added: " + oneQuestion.question);
    });
  }
);

//If you are 65 years old or older and have been a legal permanent resident of the United States for 20 or more years, you
//may study just the questions that have been marked with an asterisk.

// How to run seed file in production:
// heroku run node bin/seed.js
