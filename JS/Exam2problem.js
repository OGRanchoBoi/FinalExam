function MenuChoice()

{
    if (document.getElementById("menu").value == "View Categories")
    {
        document.getElementById("viewallcat").style.visibility="visible";
        document.getElementById("addnewcat").style.visibility="hidden";
        document.getElementById("updatecatdesc").style.visibility="hidden";
        document.getElementById("deletecatid").style.visibility="hidden";
        document.getElementById("aboutme").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "Add New Category")
    {
        document.getElementById("viewallcat").style.visibility="hidden";
        document.getElementById("addnewcat").style.visibility="visible";
        document.getElementById("updatecatdesc").style.visibility="hidden";
        document.getElementById("deletecatid").style.visibility="hidden";
        document.getElementById("aboutme").style.visibility="hidden";
    }
    
    else if (document.getElementById("menu").value == "Update Category Description")
    {
        document.getElementById("viewallcat").style.visibility="hidden";
        document.getElementById("addnewcat").style.visibility="hidden";
        document.getElementById("updatecatdesc").style.visibility="visible";
        document.getElementById("deletecatid").style.visibility="hidden";
        document.getElementById("aboutme").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value == "Delete Category")
    {
        document.getElementById("viewallcat").style.visibility="hidden";
        document.getElementById("addnewcat").style.visibility="hidden";
        document.getElementById("updatecatdesc").style.visibility="hidden";
        document.getElementById("deletecatid").style.visibility="visible";
        document.getElementById("aboutme").style.visibility="hidden";
    }
    else if (document.getElementById("menu").value == "Contact Information")
    {
        document.getElementById("viewallcat").style.visibility="hidden";
        document.getElementById("addnewcat").style.visibility="hidden";
        document.getElementById("updatecatdesc").style.visibility="hidden";
        document.getElementById("deletecatid").style.visibility="hidden";
        document.getElementById("aboutme").style.visibility="visible";
    }
    else
    {
        document.getElementById("viewallcat").style.visibility="hidden";
        document.getElementById("addnewcat").style.visibility="hidden";
        document.getElementById("updatecatdesc").style.visibility="hidden";
        document.getElementById("deletecatid").style.visibility="hidden";
        document.getElementById("aboutme").style.visibility="hidden";
    }
}

function GetCategory()

{
    var objRequest = new XMLHttpRequest();
    
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    
    objRequest.onreadystatechange = function()
    
    {
        if(objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateCategoryOutput(output);
            
        }
    };
    // initiates the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
    
}

function GenerateCategoryOutput(result)

{
    var count = 0;
    var displaytest ="<table><tr><th> Category ID </th><th> Category Name </th><th> Category Description </th></tr>";
   
    
    // Loops to extract data from the response object
    
    
    
    for (count = 0; count < result.GetAllCategoriesResult.length; count ++)
    {
        
        displaytest += "<tr><td> " + result.GetAllCategoriesResult[count].CID + " </td><td> " + result.GetAllCategoriesResult[count].CName + " </td><td> " + result.GetAllCategoriesResult[count].CDescription + "<br>";
        
    }
    
    displaytest += "</table>";
    
    document.getElementById("displayAllCategories").innerHTML = displaytest;
}

function CreateCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
    
    //Collect customer data from web page
    
    var categoryname = document.getElementById("newcatname").value;
    var categorydescription = document.getElementById("newcatdescription").value;
    
    //Create the parameter string
    
    var newcategory = '{"CDescription":"'+ categorydescription+ '","CName":"'+ categoryname+ '"}';
    
    // Checking for AJAX operation return
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult(result);
        }
    };
    // Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Conent-type", "application/x-www-form-urlencoded");
    objRequest.send(newcategory);
    
    
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("displaynewcat").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("displaynewcat").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function UpdateDescription()

{
    
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    //Collect customer data from web page
    
    var cid = document.getElementById("cidtoupdate").value;
    var cdescription = document.getElementById("updatecdescription").value;
    
    //Create the parameter string
    
    var changedescription = '{"CID":"'+ cid+'","CDescription":"'+ cdescription+'"}';
    
    // Checking for AJAX operation return
    
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var result = JSON.parse(objRequest.responseText);
            OperationResult2(result);
        }
    };
    // Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Conent-type", "application/x-www-form-urlencoded");
    objRequest.send(changedescription);
    
    
}


function OperationResult2(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("updateresult").innerHTML = "The update was successful!";
    }
    else
    {
        document.getElementById("updateresult").innerHTML = "The operation was not successful" + "<br>" + output.Exception;
    }
}

function DeleteCategory()
{
    var objRequest = new XMLHttpRequest();
    var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
    url += document.getElementById("deletecat").value;
    
    objRequest.onreadystatechange = function ()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    };
    objRequest.open("GET",url,true);
    objRequest.send();
}


function GenerateOutput(result)

{
    if (result.DeleteCategoryResult.WasSuccessful) {
        document.getElementById("result3").innerHTML = "The deletion was successful!";
    }
    
    else {
        document.getElementById("result3").innerHTML = "The deletion was not successful" + "<br>" + result.DeleteCategoryResult.Exception;
    }

}