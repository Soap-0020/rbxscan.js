type Asset = {
  id: number;
  type: string;
  name: string;
  description: string;
  created: string;
  updated: string;
  genres: string[];
  enableComments: boolean;
  isCopyingAllowed: boolean;
  isPublicDomainEnabled: boolean;
  isModerated: boolean;
  reviewStatus: string;
  isVersioningEnabled: boolean;
  isArchivable: boolean;
  canHaveThumbnail: boolean;

  creator: {
    type: "User" | "Group";
    typeId: number;
    targetId: number;
  };
};

export default Asset;
