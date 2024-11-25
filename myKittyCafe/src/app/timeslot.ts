export interface TimeSlot {
    time: string,
    numAppt: number,
    isSelected: boolean,
    aboveCapacity: boolean,
    limit: number
  }