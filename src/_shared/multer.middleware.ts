import { MulterModule } from '@nestjs/platform-express';

export const MulterConfig = MulterModule.register({
  dest: './uploads', 
} );
