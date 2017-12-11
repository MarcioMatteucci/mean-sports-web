export interface IGame {
   _id: string;
   localTeam: {
      name: string;
      goals: number;
      events: string[];
   };
   visitingTeam: {
      name: string;
      goals: number;
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
