const createCalendar = ({year, locale}) => {
  const intl = new Intl.DateTimeFormat(locale, {month: 'long'})
  const intlWeekDay = new Intl.DateTimeFormat(locale, {weekday: 'short'})
  const months = [...Array(12).keys()]
  const weekDays = [...Array(7).keys()]

  const calendar = months.map(monthKey => {
    const monthName = intl.format(new Date (year, monthKey))
    let nDays = (new Date(year, monthKey+1, 0).getDate())
    const startsOn = new Date(year, monthKey, 1).getDay()
    return {
      monthName,
      nDays,
      startsOn
    }
  }) 
  
  const weekDayNames = weekDays.map(index => {
    const weekDayName = intlWeekDay.format(new Date(2023, 4, index+1))
    return weekDayName
  })
  
  const mainRender = calendar.map(({monthName, nDays, startsOn}) => {
  
    const renderedWeekDays = weekDayNames.map(weekDayName => {
      return `<li>${weekDayName}</li>`
    }).join('')
  
    const days = [...Array(nDays).keys()]
  
    const firstDayAtributte = `class='firstDay' style='--first-day-start: ${startsOn}'`
  
    const redenrerDays = days.map((day, index) => {
      return `<li ${index === 0 ? firstDayAtributte : ''}>${day+1}</li>`
    }).join('')
  
    return `
            <section>
              <h1>${monthName}</h1>
              <div class='listsParent'>
                <ul class='nameDays'>${renderedWeekDays}</ul>
                <ul class='numberDays'>
                  ${redenrerDays}
                </ul>
              </div>
            </section>
            `
  }).join('')
  
  document.querySelector('main').innerHTML = mainRender
}

createCalendar({year: new Date().getFullYear() , locale: 'es'})

const main = document.querySelector('main')
document.querySelector('.btnNext').addEventListener('click', () => {
  main.scrollTo({top: main.scrollTop + window.innerHeight, behavior: 'smooth'})
})
document.querySelector('.btnBack').addEventListener('click', () => {
  main.scrollTo({top: main.scrollTop - window.innerHeight, behavior: 'smooth'})
})