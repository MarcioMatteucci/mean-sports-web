export interface IGame {
   _id: string;
   localTeam: {
      name: string;
      events: string[];
   };
   visitingTeam: {
      name: string;
      events: string[];
   };
   start: {
      isStarted: boolean;
      startedAt: Date;
   };
   finish: {
      isFinished: boolean;
      finishedAt: Date;
   };
   createdAt: Date;
   updatedAt: Date;
}
