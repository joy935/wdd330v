document.addEventListener('DOMContentLoaded', function() {

    const formElem = document.getElementById('formElem');

    formElem.addEventListener("submit", (e) =>  {
        e.preventDefault();

        const formData = new FormData(formElem);
        formData.append('submitted', new Date());
        
        for (let key of formData.keys()) {
          console.log(key, formData.get(key));
        }
    })
});