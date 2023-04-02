interface GetWeekDaysParams {
  short?: boolean
}

export default function getWeekDays({ short = false }: GetWeekDaysParams = {}) {
  const formatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  const weekDays = Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2022, 2, day))))
    .map((weekDay) => {
      if (short) {
        return weekDay.substring(0, 3).toUpperCase()
      }

      return weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1))
    })

  return weekDays
}
