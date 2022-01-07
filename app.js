const inquirer = require('inquirer');
const fetch =  require('node-fetch');
const cTable = require('console.table');

const start = () => {
  inquirer
  .prompt([{
    type: 'list',
    name: 'start_action',
    message: 'What would you like to do?',
    choices: [
      {name:"View all departments", value:"Vdepartments"},
      {name:"View all roles", value:"Vroles"},
      {name:"View all employees", value:"Vemployees"},
      {name:"Add a department", value:"Adepartment"},
      {name:"Add a role", value:"Arole"},
      {name:"Add an employee", value:"Aemployee"},
      {name:"Edit an employee", value:"Edit"},
      {name:"Exit", value:"Exit"}
    ]
  }
])
.then (({ start_action }) => {
  if (start_action === 'Vdepartments'){
    viewDepartments();
  } else if (start_action === 'Vroles'){
    viewRoles();
  } else if(start_action === 'Vemployees'){
    viewEmployees();
  } else if (start_action === 'Adepartment'){
    addDepartments();
  } else if(start_action === 'Arole'){
    addRole();
  } else if (start_action === 'Aemployee') {
    addEmployee();
  } else if (start_action === 'Edit'){
    editEmployee();
  } else if(start_action === 'Exit'){
    return;
  }
})
}


const viewDepartments = () => {
  queryUrl = `http://localhost:3001/api/departments`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(departmentsData => {
    console.table(departmentsData.data);
    start();

  });
}

const viewRoles = () => {
  queryUrl = `http://localhost:3001/api/roles`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return console.log('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(rolesData => {
    console.table(rolesData.data);
    start();

  });
}

const viewEmployees = () => {
  queryUrl = `http://localhost:3001/api/employees`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return console.log('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(employeesData => {
    console.table(employeesData.data);
    start()
  });
}

const addDepartments = () => {
  inquirer
  .prompt([{
    type: 'text',
    name: 'name',
    message: 'What is the name of the department?'
    }
  ])
  .then(({name}) =>{ 

    const department = {name};
    fetch('http://localhost:3001/api/department', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(department)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        alert('Error: ' + response.statusText);
      })
      .then(postResponse => {
        // console.log(postResponse);
        start();
      });
  })

};

const addRole = () => {
  queryUrl = `http://localhost:3001/api/departments`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(departmentsData => {
    let departments = [];
    for (let i=0; i < departmentsData.data.length; i ++){
      departments.push({name:departmentsData.data[i].name, value:departmentsData.data[i].id})
    }
    inquirer
    .prompt([{
      type: 'text',
      name: 'title',
      message: 'What is the title of the role?'
      },
      {
      type: 'number',
      name: 'salary',
      message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Which departments does the role belong to?',
        choices: departments
      }
    ])
    .then(({title, salary, department_id}) =>{ 
  
      const role = { title, salary, department_id };
      fetch('http://localhost:3001/api/role', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(role)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          alert('Error: ' + response.statusText);
        })
        .then(postResponse => {
          // console.log(postResponse);
          start();
        });
    })








  });

}

const addEmployee = () => {


  queryUrl = `http://localhost:3001/api/roles`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(rolesData => {
    let roles = [];
    for (let i=0; i < rolesData.data.length; i ++){
      roles.push({name:rolesData.data[i].title, value:rolesData.data[i].id})
    }

    queryUrl = `http://localhost:3001/api/employees`;
    fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(employeesData => {
      let managers = [{name: 'None', value:"None"}];
      for (let i=0; i < employeesData.data.length; i ++){
        let fullName = employeesData.data[i].first_name + " " +employeesData.data[i].last_name; 
        managers.push({name: fullName, value:employeesData.data[i].id})
      }
      inquirer
      .prompt([{
        type: 'text',
        name: 'first_name',
        message: "What is the employee's first name ?"
        },
        {
        type: 'text',
        name: 'last_name',
        message: "What is the employee's last name ?"
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'What is the employeess role?',
          choices: roles
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Who is the employees manager',
          choices: managers
        }
      ])
      .then(({first_name, last_name, role_id, manager_id}) =>{ 
    
        const employee = { first_name, last_name, role_id, manager_id };
        fetch('http://localhost:3001/api/employee', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(employee)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(postResponse => {
            // console.log(postResponse);
            start();
          });
      })
    });
  });
}

const editEmployee = () => {

  queryUrl = `http://localhost:3001/api/roles`;
  fetch(queryUrl)
  .then(response => {
    if (!response.ok) {
      return alert('Error: ' + response.statusText);
    }
    return response.json();
  })
  .then(rolesData => {
    let roles = [];
    for (let i=0; i < rolesData.data.length; i ++){
      roles.push({name:rolesData.data[i].title, value:rolesData.data[i].id})
    }

    queryUrl = `http://localhost:3001/api/employees`;
    fetch(queryUrl)
    .then(response => {
      if (!response.ok) {
        return alert('Error: ' + response.statusText);
      }
      return response.json();
    })
    .then(employeesData => {
      let employees = [];
      for (let i=0; i < employeesData.data.length; i ++){
        let employee_name = employeesData.data[i].first_name + " " + employeesData.data[i].last_name;
        employees.push({name:employee_name , value:employeesData.data[i].id})
      }
      inquirer
      .prompt([{
        type: 'list',
        name: 'employee_id',
        message: "Which employee's role do you want to update?",
        choices: employees
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Which role do you want to assign to the selected employee?',
          choices: roles
        }
      ])
      .then(({employee_id, role_id}) =>{ 
        const role = { role_id };
        fetch(`http://localhost:3001/api/employee/${employee_id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(role)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(postResponse => {
            // console.log(postResponse);
            start();
          });
      })
    });
  });



}

start();