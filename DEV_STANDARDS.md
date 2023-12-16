# Development Standards

## Branch Naming Conventions
Checkout a branch using [GitHub Desktop](https://desktop.github.com/) or `git checkout -b branchName`

There will be different types of branches to ensure proper maintenance of the repository and to provide a clear way of separating tasks.

Below is a list of the branch categories.

- **hotfix**: Quick fix for critical issues with a temporary solution.
- **bugfix**: Fixing a bug.
- **feature**: For implementing, removing, or modifying a feature.
- **test**: Experimenting with something that is not an issue.

Based on what type of branch you need to develop, the branch naming will be required as followed (all lowercase):

`[category]/[firstName]-[taskNumber]`

An example of this would be: 

`feature/name-task17` or `bugfix/name-task9`

## Formatting
### K & R indentation style
K & R indentation styling can be found [here](https://en.wikipedia.org/wiki/Indentation_style#K&R_style).

**Indentation:**  
We will use 4 spaces for indentation for easier code readability.

## Naming Conventions
### File Naming
Variables will follow the Camel Casing naming convention. This starts with a lowercase letter and any subsequent words start with a capital letter. No spaces, hyphens, or underscores.

**Example**  
```myFile.js```

It is important to avoid spaces or any special characters, and choose file names that reflect the purpose of the content.

### Variable Naming
Variables will follow the Camel Casing naming convention.

**Example**  
`var dogName = "whatever";`

Please name variables accordingly. Specify what it is, so it is easy to understand.

### Constants
Constants are immutable values and should be declared in all caps. If it is more than one word, then use underscores to separate the words.

**Example**  
`var DOG = 4;`  
`var NUMBER_OF_DOGS = 4;`

### Functions
Functions will follow the Camel Casing naming convention as well.

**Example**
```javascript
function getName(dogName, ownerName) { 
  return `${dogName} ${ownerName}`;
}
```

### Methods
Methods are functions that are associated with an object. Methods will be Camel Case.

**Example**
```javascript
getName() { 
  return `${this.dogName} ${this.ownerName}`; 
}
```
### Components
Components will follow the Pascal Casing naming convention just like file names. This means the name starts with a capital letter and any subsequent words start with a capital letter. No spaces, hyphens, or underscores.

**Example**  
`MyComponent.js`