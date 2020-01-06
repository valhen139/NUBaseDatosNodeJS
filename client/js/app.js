
class EventManager {
    constructor() {
        this.urlBase = "API/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
        this.logout()
    }

    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            if (response=="not logued"){
                $.post('/API/logout', (response) => {
                    window.location.href = "http://localhost:8082/index.html"
                })
            }else{
            this.inicializarCalendario(response)
            }
        })
    }

    eliminarEvento(evento) {
        console.log(evento)
        let eventId = evento._id
        $.post('/API/events/delete/'+eventId, {id: eventId}, (response) => {
            console.log(response)
            alert("Eventos eliminado: " + response.deletedCount)
        })
    }

    logout(){
        $('.logout-image').on('click', (ev) =>{
            //ev.preventDefault()
            console.log("entr logout")
            $.post('/API/logout', (response) => {
                window.location.href = "http://localhost:8082/index.html"
            })
        })
    }

    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: title,
                    start: start,
                    end: end
                }
                $.post(url, ev, (response) => {
                    if (typeof response._id!='undefined'){
                        alert("Evento credo con id: "+response._id)
                    } else{
                        alert("Error al crear el evento")
                    }
                    
                })
                $('.calendario').fullCalendar('renderEvent', ev)
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    actualizarEvento(evento, dayDelta) {
        let url = this.urlBase + '/update/' + evento._id
        console.log(dayDelta)
        let fechaini = this.addDays(evento.start._i, dayDelta._days)
        let fechafin = ""
        if (evento.end != null){
            fechafin = this.addDays(evento.end._i, dayDelta._days)
        }
        console.log(evento.start._i)
        var eventnew = { 
            id: evento._id,
            start: fechaini,
            end: fechafin
        }
        
        console.log(eventnew)
        $.post(url, eventnew, (response) => { 
            alert("Eventos actualizado")
        })
    }
    addDays(fecha, days) {
        let dayend = parseInt(fecha.substr(8, 2)) + days
        let daysnew = ("0" + dayend).slice(-2);
        let fechanueva
        if (fecha.length>12){
            fechanueva = fecha.substr(0, 8) + daysnew + "T"+fecha.substring(11)
        }else{
            fechanueva = fecha.substr(0, 8) + daysnew + fecha.substring(11)
        }
        
        return fechanueva
    }
    inicializarFormulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }

    inicializarCalendario(eventos) {
        $('.calendario').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2020-01-01',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event, dayDelta) => {
                this.actualizarEvento(event, dayDelta)
            },
            events: eventos,
            eventDragStart: (event,jsEvent) => {
                
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
        
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        
                    $('.calendario').fullCalendar('removeEvents', event._id);
                    this.eliminarEvento(event)
                    }
                    
                }
            })
        }
    }

    const Manager = new EventManager()
