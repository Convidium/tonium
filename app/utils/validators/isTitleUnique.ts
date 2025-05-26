import { fetchData } from "@/app/services/fetchService";

async function isTitleUnique(title: string, query: string) {
  console.log(`Checking if title "${title}" is unique...`);
  return new Promise(resolve => {
    setTimeout(() => {
      const existingTitles = ['Existing Album', "The Beatles"];
      resolve(!existingTitles.includes(title));
    }, 500);
  });
}

export default isTitleUnique;