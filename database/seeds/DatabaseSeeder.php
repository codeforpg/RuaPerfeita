<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(Start::class);
        try{
            \DB::beginTransaction();

            $tipo = \App\Tipo::create([
                'nome' => 'Radar',
                'imagem' => '/img/radar.png',
                'imagem_icon' => '/icon/radar.png'
            ]);

            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Radar controle de velocidade',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Radar avanço de semaforo',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Radar parada na faixa de pedestre',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Velocidade 30km/h',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Velocidade 40km/h',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Velocidade 60km/h',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Velocidade 80km/h',
            ]);

            $tipo = \App\Tipo::create([
                'nome' => 'Faixa Elevada',
                'imagem' => '/img/faixa_elevada.png',
                'imagem_icon' => '/icon/faixa_elevada.png'
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Faixa Elevada',
            ]);


            $tipo = \App\Tipo::create([
                'nome' => 'Semaforo',
                'imagem' => '/img/semaforo.png',
                'imagem_icon' => '/icon/semaforo.png'
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo 2 estafio',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo 3 estagio',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo 4 estagio',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo piscante',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Semaforo pedestre',
            ]);


            $tipo = \App\Tipo::create([
                'nome' => 'Lombada',
                'imagem' => '/img/lombada.png',
                'imagem_icon' => '/icon/lombada.png'
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Lombada',
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Lombada Eletronica',
            ]);


            $tipo = \App\Tipo::create([
                'nome' => 'Rotatoria',
                'imagem' => '/img/rotatoria.png',
                'imagem_icon' => '/icon/rotatoria.png'
            ]);
            \App\Propriedade::create([
                'tipo' => $tipo->id_tipo,
                'descricao' => 'Rotatoria',
            ]);

            // importação dos pins default

            $content = \File::get(storage_path('IMPORTACAO.csv'));
            $content_array = explode("\n", $content);

            $status = \App\PinStatus::create(['descricao'=>'fixo']);

            foreach ($content_array as $linha) {
                if(strpos($linha,'Point') === 0){
                    $linha_array = explode(',',$linha);
                    if(isset($linha_array[6]) == false) {
                        continue;
                    }
                    switch ($linha_array[6]){
                        case 'Controlador de Velocidade':
                            $tipo_table = \App\Tipo::where('nome', 'Radar')->first();
                            $tipo = $tipo_table->id_tipo;
                            break;
                        case 'Rotatoria':
                            $tipo_table = \App\Tipo::where('nome', 'Rotatoria')->first();
                            $tipo = $tipo_table->id_tipo;
                            break;
                        case 'Faixa Elevada':
                            $tipo_table = \App\Tipo::where('nome', 'Faixa Elevada')->first();
                            $tipo = $tipo_table->id_tipo;
                            break;
                        case 'Semafaro':
                            $tipo_table = \App\Tipo::where('nome', 'Semaforo')->first();
                            $tipo = $tipo_table->id_tipo;
                            break;
                        case 'Lombada Eletronica':
                            $tipo_table = \App\Tipo::where('nome', 'Lombada')->first();
                            $tipo = $tipo_table->id_tipo;
                            break;
                    }
                    $pin = [];
                    $pin['lat'] = substr_replace($linha_array[8], '.', 3, 0);
                    $pin['long'] = substr_replace($linha_array[7], '.', 3, 0);
                    $pin['tipo'] = $tipo;
                    $pin['descricao'] = $linha_array[2]. " " . $linha_array[3] . " " . $linha_array[4] . $linha_array[6]. " ".$linha_array[5];
                    $pin['id_pin_status'] = $status->id_pin_status;
                    \App\Pin::create($pin);
                }
            }
            \DB::commit();
        }catch (\Mockery\CountValidator\Exception $e){
            \DB::rollback();
            dd($e->getMessage());
        }

    }
}
