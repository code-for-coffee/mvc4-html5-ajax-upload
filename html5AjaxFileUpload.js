/* 
    
    HTML5 Ajax File uploading
    Tested with ASP.NET MVC 4 (C#)
    12/12/13 - github.com/code-for-coffee

    idElementForFiles       - name of the <input type="file"> id
    idToAppendImagesTo      - id of the <div>, <article>, etc to append image previews to
    classForImagePreviews   - CSS class for image previews
    ajaxPostPath            - Relative URL for where the Ajax POST should be directed to
    idToPlaceResponseText   - id of the <div>, <article>, etc to place the Ajax response text

    Released under the MIT license.

*/


function html5AjaxUpload (idElementForFiles, idToAppendImagesTo, classForImagePreviews, ajaxPostPath, idToPlaceResponseText) {
    var formdata = new FormData();                                  // Create FormData (HTML5 Required)
    var uploadedFiles = document.getElementById(idElementForFiles); // set our uploadedFiles variable
    var output = [];                                                // array to store our image previews via HTML
    
    // Iterate through each file in uploadedFiles
    for (i = 0; i < uploadedFiles.files.length; i++) {
        
        //Appending each file to FormData object
        formdata.append(uploadedFiles.files[i].name, uploadedFiles.files[i]);
        
        // regex of upload types that are allowed
        var imageType = /image.*/;

        // iterate through files that match the imageType regex
        if (uploadedFiles.files[i].type.match(imageType)) { 
            var reader = new FileReader();                          // Create FileReader (HTML5 Required)
            if (uploadedFiles.files[i].type.match(imageType)) { 
                var img = document.createElement("img");
                img.src = window.URL.createObjectURL(uploadedFiles.files[i]);
                imageFilePath[i] = img.src;
                img.classList.add(classForImagePreviews);
                img.file = uploadedFiles.files[i];
                document.getElementById(idToAppendImagesTo).appendChild(img); 
                reader.onload = (function (aImg) {
                    return function (e) {
                        aImg.src = e.target.result;
                    };
                })(img);
                reader.readAsDataURL(uploadedFiles.files[i]);
            }
        }
        document.getElementById("list").innerHTML = output.join("");

    }
    // create new Ajax call and send
    var xhr = new XMLHttpRequest();
    xhr.open('POST', ajaxPostPath);
    xhr.send(formdata);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById(idToPlaceResponseText).innerHTML = xhr.responseText;
        }
    }
    return false;
}