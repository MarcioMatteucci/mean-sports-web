export interface IEvent {
   _id: string;
   type: string;
   player1: string;
   player2?: string;
   isOwnGoal?: boolean;
   createdAt: Date;
   updatedAt: Date;
}