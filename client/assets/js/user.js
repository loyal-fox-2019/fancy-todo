class User{
    static $user(){
        return $.ajax({
            type: "GET",
            url: urlApi+"/users/id",
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        });
    }
    
}