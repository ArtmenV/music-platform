import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@clustermusic.xsgwp.mongodb.net/music?retryWrites=true&w=majority',
    ),
    TrackModule,
  ],
})
export class AppModule {}
