function switchModeTo(selectedMode) {
    $('#uploaded-name-img').html('');
    $('#uploaded-description-img').html('');

    if (selectedMode === 'ocr-mode') {
        $('#ocr-name-link').val('');
        $('#ocr-description-link').val('');
        $('.ocr-mode').show();
        $('.type-mode').hide();
    } else {
        $('.ocr-mode').hide();
        $('.type-mode').show();
    }
}

function loadText(destination) {
    const element = $(`#ocr-${destination}-link`);

    $(`#uploaded-${destination}-img`).append(`
        <img src="${element.val()}" alt="ocr-${destination}-image" style="max-height: 200px;">
    `)

    axios({
        method: 'POST',
        url: 'http://localhost:3000/ocr/',
        headers: {
            token: localStorage.getItem('token')
        },
        data: {
            url: element.val()
        }
    })
        .then(({data}) => {
            $(`#${destination}`).val(data.parsedText);
        }).catch((err) => {
            customAlert(err);
        });
}