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
    static $users(){
        return $.ajax({
            type: "GET",
            url: urlApi+"/users",
            headers: {
                token: localStorage.getItem('fancy.todo.token')
            }
        })
    }

    static generateSelectUser(){
        User.$users()
            .done(({users}) => {
                const elMember = $('#formProject #members')
                const elFormMember = $('#formMember #members')
                for (let i = 0; i < users.length; i++) {
                    console.log('i')
                    if (users[i].username !== localStorage.getItem('fancy.todo.username')) {
                        let html = `<option value="${users[i]._id}">${users[i].username}</option>`
                        elMember.append(html)
                        elFormMember.append(html)
                    }
                }
            })
            .fail(errs => {
                console.log(errs)
            })
    }
}