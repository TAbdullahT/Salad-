const sqlite3 = require("sqlite3");
const sqlite = require('sqlite')

const getDbConnection = async () => {
    return await sqlite.open({
        filename: 'projectDB.db',
        driver: sqlite3.Database
    })
};

async function addorder(orderNo, customerNo, title, prais, Url) {

    const db = await getDbConnection();
    const sql = await db.prepare(`insert into orders('orderNo','customerNo','title', 'prais','Url') values (?,?,?,?,?)`);
    try {
        const meta = await sql.run([orderNo, customerNo, title, prais, Url], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err);
    }
};
async function addsaladlist(saladNo, title, time, foodDescription, prais, Url) {

    const db = await getDbConnection();
    const sql = await db.prepare(`insert into saladlist('saladNo','title','time','foodDescription', 'prais','Url') values (?,?,?,?,?,?)`);
    try {
        const meta = await sql.run([saladNo, title, time, foodDescription, prais, Url], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err);
    }
};
async function addUserInfo(username, password, lname, fname, sex, bdate, type) {
    const db = await getDbConnection();

    // Check if the username already exists
    const existingUser = await db.get('SELECT * FROM person WHERE username = ?', username);
    if (existingUser) {
        await db.close();
        throw new Error('Username already exists');
    }

    const sql = await db.prepare(`INSERT INTO person('username', 'Address', 'Fname', 'Lname', 'Phone_Number', 'Email', 'Password', 'Type') VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    try {
        const meta = await sql.run([username, "NULL", fname, lname, "NULL", "NULL", password, type], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err)
    }
};
async function login(username, Password) {

    const db = await getDbConnection();
    const sql = "select Type from Person where Username=? and Password=?";
    try {
        const row = await db.all(sql, [username, Password], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        if (row.length === 1) {
            if (row[0].Type === "Customer") {
                return "Customer";
            }
            else if (row[0].Type === "Employee") {
                return "Employee";
            }
        }
        else {
            return "none";
        }

    }
    catch (err) {
        console.log(err)
    }
};
async function showAllCustomer(customerNo) {

    const db = await getDbConnection();
    const sql = "SELECT * FROM Person WHERE UserName=? ";
    try {
        const rows = await db.all(sql, [customerNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};

// I DIDNT USE IT YET
async function removeUserInfo(username) {

    const db = await getDbConnection();
    const sql = "delete from Person where username=?";
    try {
        const rows = await db.all(sql, [username], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err);
    }

};
async function deletorder(orderNo) {

    const db = await getDbConnection();
    const sql = "delete from orders where orderNo=?";
    try {
        const rows = await db.all(sql, [orderNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function deletesalad(saladNo) {

    const db = await getDbConnection();
    const sql = "delete from saladlist where saladNo=?";
    try {
        const rows = await db.all(sql, [saladNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function deleteCompletedOrder(customerNo) {

    const db = await getDbConnection();
    const sql = "UPDATE orders SET pay = 'paid' WHERE customerNo=? AND pay = 'not pay'";
    try {
        const result = await db.run(sql, [customerNo]);
        await db.close();
        return result.changes; // returns number of rows updated
    } catch (err) {
        console.log(err);
    }

};
async function deletepersonemp(ID) {

    const db = await getDbConnection();
    const sql = "delete from Person where ID=?";
    try {
        const rows = await db.all(sql, [ID], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function addSubsc(CustomerName, title, subscDescription) {

    const db = await getDbConnection();
    const sql = await db.prepare(`insert into Customer_subcs('CustomerName','title', 'subscDescription') values (?,?,?)`);
    try {
        const meta = await sql.run([CustomerName, title, subscDescription], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err);
    }
};

async function showallsubsc() {

    const db = await getDbConnection();
    const sql = "select * from subcs";
    try {
        const rows = await db.all(sql, [], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function updatePersonalInfo(UserName, Password, Fname, Lname) {

    const db = await getDbConnection();
    const sql = await db.prepare(`UPDATE Person set  Fname=?, Lname=?, Password=? where UserName=?`);
    try {
        const meta = await sql.run([Fname, Lname, Password, UserName], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err)
    }

};
async function deletepersoncust(ID) {

    const db = await getDbConnection();
    const sql = "delete from Person where ID=?";
    try {
        const rows = await db.all(sql, [ID], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function addRespone(ReportID, Response) {

    const db = await getDbConnection();
    const sql = await db.prepare(`UPDATE Reports set  Response =? where ReportID =?`);
    try {
        const meta = await sql.run([Response, ReportID], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err)
    }

};
async function showallReports() {

    const db = await getDbConnection();
    const sql = "select * from Reports";
    try {
        const rows = await db.all(sql, [], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function showall_Customer_Reports(PersonID) {

    const db = await getDbConnection();
    const sql = "SELECT * FROM Reports WHERE PersonID=? ";
    try {
        const rows = await db.all(sql, [PersonID], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};

async function deletecustorder(orderNo) {

    const db = await getDbConnection();
    const sql = "delete from orders where orderNo=?";
    try {
        const rows = await db.all(sql, [orderNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function deleteReport(ReportID) {
    const db = await getDbConnection();
    const sql = "delete from Reports where ReportID =?";
    try {
        const rows = await db.all(sql, [ReportID], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function createReport(ReportName, description, PersonID) {
    const db = await getDbConnection();
    const sql = "INSERT INTO Reports (ReportName, description, PersonID) VALUES (?, ?, ?)";
    const values = [ReportName, description, PersonID];

    try {
        await db.run(sql, values);
        await db.close();
        console.log('Report added successfully');
    } catch (err) {
        console.log(err);
    }
};
// I DID NOT USE IT YET
async function editUserInfo(username, password, Lname, Fname, sex, bdate, type) {

    const db = await getDbConnection();
    const sql = await db.prepare(`update person set  Address=?, Fname=?, Lname=?, Phone_Number=?, Email=?, Password=? ,Type=? where username=?`);
    try {
        const meta = await sql.run(["NULL", Fname, Lname, "NULL", "NULL", password, type, username], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await sql.finalize();
        await db.close();
        return meta;
    }
    catch (err) {
        console.log(err)
    }

};

// I DID NOT USE IT YET
async function showallsalad() {

    const db = await getDbConnection();
    const sql = "select * from saladlist";
    try {
        const rows = await db.all(sql, [], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    }
    catch (err) {
        console.log(err)
    }

};
async function listCustomerOrders(customerNo) {

    const db = await getDbConnection();
    const sql = "SELECT * FROM orders WHERE customerNo=? AND pay='not pay'";
    try {
        const rows = await db.all(sql, [customerNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};
async function listemployees(customerNo) {
    const db = await getDbConnection();
    const sql = "SELECT * FROM person WHERE type = 'Employee'";
    try {
        const rows = await db.all(sql, [customerNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }

};
async function listcustomers(customerNo) {
    const db = await getDbConnection();
    const sql = "SELECT * FROM person WHERE type = 'Customer'";
    try {
        const rows = await db.all(sql, [customerNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }
};
async function listOrders(orderNo) {
    const db = await getDbConnection();
    const sql = "SELECT * FROM orders";
    try {
        const rows = await db.all(sql, [orderNo], function (err) {
            if (err) {
                console.log(err)
            }
        });
        await db.close();
        return rows;
    } catch (err) {
        console.log(err)
    }
};


module.exports = {
    addSubsc,
    showallsubsc,
    deletorder,
    deletesalad,
    deleteCompletedOrder,
    updatePersonalInfo,
    showallsalad,
    showAllCustomer,
    showallReports,
    showall_Customer_Reports,
    listCustomerOrders,
    deleteReport,
    addRespone,
    addorder,
    addsaladlist,
    addUserInfo,
    createReport,
    removeUserInfo,
    deletecustorder,
    listOrders,
    deletepersoncust,
    deletepersonemp,
    listcustomers,
    listemployees,
    editUserInfo,
    login
};