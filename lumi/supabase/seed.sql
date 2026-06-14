-- Seed Data para demonstração do projeto LUMI

-- Limpar dados existentes
TRUNCATE TABLE public.event_history, public.safe_areas, public.alerts, public.locations, public.bracelets, public.children, public.users CASCADE;

-- Inserir Usuário Administrador
INSERT INTO public.users (id, name, email) 
VALUES ('11111111-1111-1111-1111-111111111111', 'Alexandre Lima', 'admin@lumi.com');

-- Inserir Criança 1 (João Silva)
INSERT INTO public.children (id, user_id, name, age, photo_url, blood_type, allergies)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'João Silva', 8, 'https://ui-avatars.com/api/?name=Joao+Silva&background=2563eb&color=fff', 'O+', 'Nenhuma');

-- Inserir Criança 2 (Maria Souza)
INSERT INTO public.children (id, user_id, name, age, photo_url, blood_type, allergies)
VALUES ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'Maria Souza', 6, 'https://ui-avatars.com/api/?name=Maria+Souza&background=f472b6&color=fff', 'A+', 'Amendoim');

-- Inserir Pulseira 1
INSERT INTO public.bracelets (id, code, child_id, battery, is_connected, color, water_resistant)
VALUES ('33333333-3333-3333-3333-333333333333', 'LUMI-001', '22222222-2222-2222-2222-222222222222', 87, true, 'Azul bebê', true);

-- Inserir Área Segura (UNIFAN)
INSERT INTO public.safe_areas (id, name, lat, lng, radius)
VALUES ('55555555-5555-5555-5555-555555555555', 'UNIFAN', -12.25301, -38.95669, 300);

-- Inserir Histórico de Localizações em ordem cronológica (Feira de Santana - BA)
-- Bio Hit Vila Mariana -> Mercantil próximo à UNIFAN -> UNIFAN
INSERT INTO public.locations (bracelet_id, lat, lng, created_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', -12.2510, -38.9540, NOW() - INTERVAL '60 minutes'), -- Bio Hit (aprox)
    ('33333333-3333-3333-3333-333333333333', -12.2520, -38.9555, NOW() - INTERVAL '40 minutes'), -- Mercantil
    ('33333333-3333-3333-3333-333333333333', -12.25301, -38.95669, NOW() - INTERVAL '20 minutes'); -- UNIFAN

-- Inserir Eventos no Histórico
INSERT INTO public.event_history (bracelet_id, event_type, description, created_at)
VALUES 
    ('33333333-3333-3333-3333-333333333333', 'GPS_CONNECTED', 'GPS conectado', NOW() - INTERVAL '90 minutes'),
    ('33333333-3333-3333-3333-333333333333', 'LOCATION_UPDATE', 'Localização atualizada (Bio Hit)', NOW() - INTERVAL '60 minutes'),
    ('33333333-3333-3333-3333-333333333333', 'LOCATION_UPDATE', 'Localização atualizada (Mercantil)', NOW() - INTERVAL '40 minutes'),
    ('33333333-3333-3333-3333-333333333333', 'SAFE_AREA_ENTERED', 'Entrada em área segura: UNIFAN', NOW() - INTERVAL '20 minutes');
