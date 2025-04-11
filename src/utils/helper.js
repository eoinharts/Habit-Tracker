export function isNewDay(timestamp) {
    if(timestamp === null) return true;
    const givenDate = new Date(timestamp);
    const now = new Date();
  
    return (
      givenDate.getFullYear() !== now.getFullYear() ||
      givenDate.getMonth() !== now.getMonth() ||
      givenDate.getDate() !== now.getDate()
    );
}