import { isArray, uniq } from "lodash";

export const recentSearchKey = "recentSearch";

class StorageService {
  getRecentSearch() {
    const result = JSON.parse(sessionStorage.getItem(recentSearchKey));
    if (!isArray(result)) {
      return [];
    }

    return result;
  }

  saveRecentSearch(nextResultSearch = []) {
    sessionStorage.setItem(
      recentSearchKey,
      JSON.stringify(uniq(nextResultSearch))
    );
  }
}

const storageService = new StorageService();
export default storageService;
