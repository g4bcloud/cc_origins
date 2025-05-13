--
-- PostgreSQL database cluster dump
--

-- Started on 2025-04-29 17:18:54

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE ngd_master_user;
ALTER ROLE ngd_master_user WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN NOREPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:402iB7XfWN06JaVxLHK0Tg==$eAWtKCrOK4Bvod7cevca72i731qCJ11SkyULE1uFw4o=:d4d9iFZYFmqKngPk0qYTD57iSrOQH0WLF5M28m8DTZg=';
CREATE ROLE ngd_user;
ALTER ROLE ngd_user WITH NOSUPERUSER INHERIT NOCREATEROLE NOCREATEDB LOGIN NOREPLICATION NOBYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:r6ddHErs8DP0cTh26w+eMg==$JFUSpcfUkaS84Wov2h7FRs7mW3d/w9NC4818SqSTlyc=:E8sC9Hl65dh2N/RwkFkkCYvRPaJRfymeiijGgn/NR5w=';
-- CREATE ROLE postgres;
-- ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:Ov6EVSWh+y+/plS2br/51A==$0ah2AGf9v/lONKfwCaAecwiraSMdG0ZBeGRFPWS6xf8=:5pVIg5fkW3EVeY30tbHfsBZeoJqF+usgMHsNe1kMDVQ=';

--
-- User Configurations
--








-- Completed on 2025-04-29 17:18:54

--
-- PostgreSQL database cluster dump complete
--

